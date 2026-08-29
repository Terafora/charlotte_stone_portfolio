import type { ReactNode } from 'react';

function inline(text: string): ReactNode[] {
  const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);

  return tokens.map((token, index) => {
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = link[2].startsWith('http');
      return <a key={index} href={link[2]} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{link[1]}</a>;
    }
    if (token.startsWith('**') && token.endsWith('**')) return <strong key={index}>{token.slice(2, -2)}</strong>;
    if (token.startsWith('*') && token.endsWith('*')) return <em key={index}>{token.slice(1, -1)}</em>;
    if (token.startsWith('`') && token.endsWith('`')) return <code key={index}>{token.slice(1, -1)}</code>;
    return token;
  });
}

function tableCells(row: string) {
  return row.replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
}

export function MarkdownBody({ body }: { body: string }) {
  const blocks = body.split(/\r?\n\s*\r?\n/).filter(Boolean);

  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        const text = block.trim();
        const image = text.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (image) {
          return (
            <figure key={index} className="article-figure">
              {/* External case-study imagery is supplied by the portfolio owner. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image[2]} alt={image[1]} loading="lazy" />
              {image[1] && <figcaption>{image[1]}</figcaption>}
            </figure>
          );
        }
        if (/^---+$/.test(text)) return <hr key={index} />;
        if (text.startsWith('### ')) return <h3 key={index}>{inline(text.slice(4))}</h3>;
        if (text.startsWith('## ')) return <h2 key={index}>{inline(text.slice(3))}</h2>;
        if (text.startsWith('> ')) return <blockquote key={index}>{inline(text.replace(/^> /gm, '').replace(/\r?\n/g, ' '))}</blockquote>;
        const rows = text.split(/\r?\n/);
        if (rows.length > 2 && rows[0].includes('|') && /^\|?[\s|:\-]+\|?$/.test(rows[1])) {
          const headings = tableCells(rows[0]);
          return (
            <div className="article-table" key={index}>
              <table>
                <thead><tr>{headings.map((cell, cellIndex) => <th key={cellIndex}>{inline(cell)}</th>)}</tr></thead>
                <tbody>
                  {rows.slice(2).map((row, rowIndex) => (
                    <tr key={rowIndex}>{tableCells(row).map((cell, cellIndex) => <td key={cellIndex}>{inline(cell)}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (/^(?:-|\*) /m.test(text)) {
          return <ul key={index}>{text.split(/\r?\n/).map((line) => <li key={line}>{inline(line.replace(/^(?:-|\*) /, ''))}</li>)}</ul>;
        }
        if (/^\d+\. /m.test(text)) {
          return <ol key={index}>{text.split(/\r?\n/).map((line) => <li key={line}>{inline(line.replace(/^\d+\. /, ''))}</li>)}</ol>;
        }
        return <p key={index}>{inline(text.replace(/\r?\n/g, ' '))}</p>;
      })}
    </div>
  );
}
