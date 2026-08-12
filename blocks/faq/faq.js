/*
 * FAQ Block
 * Renders alternating question/answer rows as a collapsible accordion.
 */

export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  for (let i = 0; i < rows.length; i += 2) {
    const questionRow = rows[i];
    const answerRow = rows[i + 1];
    if (!answerRow) break;

    const summary = document.createElement('summary');
    summary.className = 'faq-item-question';
    summary.append(...questionRow.firstElementChild.childNodes);

    const body = answerRow.firstElementChild;
    body.className = 'faq-item-answer';

    const details = document.createElement('details');
    details.className = 'faq-item';
    details.append(summary, body);

    block.append(details);
  }
}
