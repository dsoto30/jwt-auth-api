export function getErrorMessage(err: any) : string {
    let message = "unknown error";
    if (err instanceof Error) {
        message = err.message;
    }
    return message;

}
    