export const windowPages = (total: number, current: number, size = 3) => {
    const half = Math.floor(size / 2)
    let start = Math.max(0, current - half)
    let end = start + size - 1
    if (end >= total) { end = total - 1; start = Math.max(0, end - size + 1) }
    const pages: (number | "left" | "right")[] = []
    if (start > 0) pages.push("left")
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < total - 1) pages.push("right")
    return pages
}
