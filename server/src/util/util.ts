export function sleep(millisecond: number) {
    return new Promise((r) => setTimeout(r, millisecond));
}
