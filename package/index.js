/**
 * Updates the innerHTML of elements within a container with the id "useStrix" based on the provided data object.
 *
 * @param {Object} data - An object where keys represent element ids and values represent the content to be set.
 * @throws Will log an error if the container with id "useStrix" is not found.
 * @throws Will log a warning if an element with a specified id is not found within the container.
 */
function strixAdd(data) {
    const container = document.getElementById("useStrix");

    if (!container) {
        console.error("Container with id 'useStrix' not found.");
        return;
    }

    Object.keys(data).forEach((key) => {
        const element = container.querySelector(`#${key}`);
        if (element) {
            element.innerHTML = data[key];
        } else {
            console.warn(`Element with id '${key}' not found in container.`);
        }
    });
}

module.exports = strixAdd;
