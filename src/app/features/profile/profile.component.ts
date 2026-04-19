import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProfileCardComponent } from '../../shared/components/organisms/profile-card/profile-card.component';
import { ProfileCardComponentInterface } from '../../shared/components/organisms/profile-card/profile-card.interface';
import { StatisticCardListComponent } from '../../shared/components/organisms/statistic-card-list/statistic-card-list.component';
import { StatisticCardListComponentInterface } from '../../shared/components/organisms/statistic-card-list/statistic-card-list.interface';
import { TitleButtonComponent } from '../../shared/components/molecules/title-button/title-button.component';
import { TitleButtonComponentInterface } from '../../shared/components/molecules/title-button/title-button.interface';
import { ActionSheetComponent } from '../../shared/components/organisms/action-sheet/action-sheet.component';
import { ActionSheetComponentInterface } from '../../shared/components/organisms/action-sheet/action-sheet.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from '../../shared/components/molecules/form/form.component';
import { FormComponentInterface } from '../../shared/components/molecules/form/form.interface';
import { StatService } from '../../core/services/stat.service';
import { AuthService, type Profile } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    ProfileCardComponent,
    StatisticCardListComponent,
    TitleButtonComponent,
    ActionSheetComponent,
    Form,
  ],
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private statService = inject(StatService);
  private authService = inject(AuthService);

  profileData = signal<Profile | null>(null);

  isCreateStatisticFormOpen = signal(false);
  editingId = signal<number | null>(null);
  usernameUrl = signal<string>('');
  isLoggedAccount = signal<boolean>(false);
  private rawStats = signal<any[]>([]);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const name = params['username'];
      if (name) {
        this.usernameUrl.set(name);
        this.loadProfileAndStats(name);
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  private loadProfileAndStats(username: string) {
    this.authService.fetchProfileByUsername(username).subscribe({
      next: (profile) => {
        if (profile) {
          this.profileData.set(profile);

          const myProfile = this.authService.currentUserValue;
          const isMine = myProfile?.id === profile.id;
          this.isLoggedAccount.set(isMine);

          console.log(this.isLoggedAccount());

          this.getStats(profile.username);
        } else {
          this.router.navigate(['/404']);
        }
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        this.router.navigate(['/404']);
      },
    });
  }

  profileCard = computed<ProfileCardComponentInterface>(() => {
    return {
      userName: {
        type: 'lg',
        text: this.profileData()?.display_name ?? this.profileData()?.display_name ?? '',
      },
      userImage: '/images/profile.png',
      editProfileButton: {
        type: 'link',
        color: 'brand',
        text: 'Editar perfil',
        url: '/edit-profile',
      },
      isLoggedAccount: this.isLoggedAccount(),
    };
  });

  statisticCardList = computed<StatisticCardListComponentInterface>(() => {
    return {
      statistics: this.rawStats().map((stat: { title: string; value: number }) => ({
        name: {
          text: stat.title,
          type: 'sm',
        },
        quantity: stat.value,
        isLoggedAccount: this.isLoggedAccount(),
        userName: `@${this.usernameUrl()}`,
      })),
    };
  });

  titleButton: TitleButtonComponentInterface = {
    title: { type: 'md', text: 'Estadísticas' },
    button: {
      type: 'button',
      color: 'brand',
      icon: '/icons/mdi--plus-thick.svg',
      ariaLabel: 'Añadir estadistica',
      event: () => this.openCreateStatisticHandler(),
    },
  };

  statisticForm: FormComponentInterface = {
    inputs: [
      {
        type: 'text',
        placeholder: 'Ej: croquetas',
        id: 'name',
        isRequired: true,
        formControlName: 'name',
        errorMessage: 'Introduce un contenido válido',
        label: 'Nombre',
      },
      {
        type: 'number',
        id: 'quantity',
        isRequired: true,
        formControlName: 'quantity',
        placeholder: 'Ej: 10',
        errorMessage: 'Introduce un número válido',
        label: 'Cantidad',
      },
    ],

    submitBtn: {
      type: 'submit',
      text: 'Publicar',
      size: 'full',
      color: 'brand',
    },

    formGroup: new FormGroup({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1)],
      }),
      quantity: new FormControl<number | null>(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
    }),
  };

  actionSheet: ActionSheetComponentInterface = {
    title: { type: 'md', text: 'Estadísticas' },
  };

  getStats(username: string) {
    this.statService.getStatsByUsername(username).subscribe({
      next: (data) => this.rawStats.set(data),
      error: (err) => console.error('Error al cargar las estadísticas:', err),
    });
  }

  updateFormTexts(isEdit: boolean) {
    this.actionSheet.title.text = isEdit ? 'Editar estadística' : 'Añadir estadística';
    this.statisticForm.submitBtn!.text = isEdit ? 'Guardar cambios' : 'Publicar';
  }

  openCreateStatisticHandler() {
    this.editingId.set(null);
    this.statisticForm.formGroup.reset();
    this.updateFormTexts(false);
    this.isCreateStatisticFormOpen.set(true);
  }

  openUpdateStaticticHandler(event: { item: any; index: number }) {
    const { item, index } = event;
    this.editingId.set(index);
    this.updateFormTexts(true);

    this.statisticForm.formGroup.patchValue({
      name: item.name.text,
      quantity: item.quantity,
    });

    this.isCreateStatisticFormOpen.set(true);
  }

  handleStatisticSubmit(value: any) {
    if (this.editingId() !== null) {
      console.log('Actualizando estadística con id:', this.editingId(), value);
    } else {
      console.log('Creando nueva estadística:', value);
    }

    this.closeCreateStatisticHandler();
  }

  closeCreateStatisticHandler() {
    this.isCreateStatisticFormOpen.set(false);
    this.statisticForm.formGroup.reset();
    this.editingId.set(null);
  }
}
