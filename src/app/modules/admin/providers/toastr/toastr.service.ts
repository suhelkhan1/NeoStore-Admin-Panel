import { ToastOptions, ToastsManager } from 'ng2-toastr';

export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  showCloseButton = false;
  dismiss = 'auto'
  toastLife = 2000
}
