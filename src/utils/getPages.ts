export function getPages(current: number, total: number): (number | string)[] {
  const pages: (number | string)[] = [];

  if (total <= 4) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);

    if (current > 3) pages.push("...");

    for (let i = current - 1; i <= current + 1; i++) {
      if (i > 1 && i < total) pages.push(i);
    }

    if (current < total - 2) pages.push("...");

    pages.push(total);
  }

  return pages;
}