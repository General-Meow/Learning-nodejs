
export function urlify(arg: string): string {
    const encodedSpace = "%20";
    let trimmedArg = arg.trim();
    return trimmedArg.replace(/\s/g, encodedSpace);
}