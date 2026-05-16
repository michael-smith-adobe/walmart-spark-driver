export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    const id = cells[0]?.textContent?.trim().toLowerCase().replace(/\s+/g, '-');
    const parentLabel = cells[1]?.textContent?.trim() || '';
    const title = cells[2]?.textContent?.trim() || '';
    const bodyCell = cells[3];

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = `modal-${id}`;
    overlay.setAttribute('aria-hidden', 'true');

    const dialog = document.createElement('div');
    dialog.className = 'modal-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-label', title);

    const header = document.createElement('div');
    header.className = 'modal-header';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = '&#x2715;';

    const parentLink = document.createElement('span');
    parentLink.className = 'modal-parent';
    parentLink.textContent = parentLabel;

    header.append(closeBtn, parentLink);

    const accent = document.createElement('div');
    accent.className = 'modal-accent';

    const body = document.createElement('div');
    body.className = 'modal-body';

    const h1 = document.createElement('h1');
    h1.textContent = title;
    body.append(h1);

    if (bodyCell) {
      [...bodyCell.children].forEach((el) => body.append(el.cloneNode(true)));
    }

    dialog.append(header, accent, body);
    overlay.append(dialog);
    document.body.append(overlay);

    closeBtn.addEventListener('click', () => {
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false') {
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  });

  block.textContent = '';
  block.style.display = 'none';

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="#modal-"]');
    if (!link) return;
    e.preventDefault();
    const modalId = link.getAttribute('href').split('#')[1];
    const overlay = document.getElementById(modalId);
    if (overlay) {
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  });
}
