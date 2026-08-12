/*
 * FAQ Block
 * Renders question/answer rows (question, answer) as a collapsible accordion.
 */

export default function decorate(block) {
  [...block.children].forEach((row) => {
    const question = row.children[0];
    const answer = row.children[1];
    if (!answer) return;

    const summary = document.createElement('summary');
    summary.className = 'faq-item-question';
    summary.append(...question.childNodes);

    answer.className = 'faq-item-answer';

    const details = document.createElement('details');
    details.className = 'faq-item';
    details.append(summary, answer);

    row.replaceWith(details);
  });
}
