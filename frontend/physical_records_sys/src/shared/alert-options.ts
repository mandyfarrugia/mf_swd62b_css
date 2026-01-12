import { SweetAlertOptions } from "sweetalert2";

export const baseAlertOptions: SweetAlertOptions = {
  confirmButtonColor: '#5dc932ff',
  cancelButtonColor: '#c51414ff'
};

export const confirmDeleteOptions: SweetAlertOptions = {
  title: 'Confirm deletion',
  text: 'Are you sure you want to delete this record?',
  icon: 'warning',
  showCancelButton: true,
  ...baseAlertOptions,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it!'
};

export const recordDeletedNotification: SweetAlertOptions = {
  title: 'Record deleted successfully!',
  text: 'The physical record has been deleted.',
  icon: 'success',
  showCancelButton: false,
  confirmButtonColor: baseAlertOptions.confirmButtonColor,
  confirmButtonText: 'OK'
}
