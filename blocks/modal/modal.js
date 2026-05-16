function closeModal(overlay) {
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    const triggerLabel = cells[0]?.textContent?.trim();
    const id = triggerLabel.toLowerCase().replace(/\s+/g, '-');
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

    closeBtn.addEventListener('click', () => closeModal(overlay));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });

    const main = document.querySelector('main');
    if (main) {
      main.querySelectorAll('strong').forEach((strong) => {
        if (strong.textContent.trim().toLowerCase() === title.toLowerCase()) {
          const trigger = strong.closest('p') || strong;
          trigger.classList.add('modal-trigger');
          trigger.dataset.modal = `modal-${id}`;
          trigger.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
          });
        }
      });
    }
  });

  block.textContent = '';
  block.style.display = 'none';

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay[aria-hidden="false"]').forEach(closeModal);
    }
  });
}
