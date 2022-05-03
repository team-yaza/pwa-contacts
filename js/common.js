document.addEventListener('DOMContentLoaded', () => {
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'left' });

  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'right' });
});
