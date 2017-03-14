export const cancelEventAndRun = (action) => (e) => {
    e.preventDefault();
    action();
}
