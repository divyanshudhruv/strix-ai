// Define a type for the data structure expected by the function
interface StrixJSON {
    title: string;
    subtitle: string;
    buttonText: string;
    description: string;
  }
  
  // Function to update HTML content based on provided data
  /**
   * Updates the innerHTML of elements within a container based on the provided JSON data.
   *
   * @param data - An object containing key-value pairs where the key corresponds to the id of an element
   *               within the container and the value is the content to be set as innerHTML of that element.
   *
   * @remarks
   * - The container is expected to have the id 'useStrix'.
   * - If the container is not found, an error is logged to the console.
   * - If an element with a specific key is not found within the container, a warning is logged to the console.
   *
   * @example
   * ```typescript
   * const data = {
   *   "elementId1": "Content for element 1",
   *   "elementId2": "Content for element 2"
   * };
   * strixAdd(data);
   * ```
   */
  function strixAdd(data: StrixJSON): void {
    const container = document.getElementById("useStrix");
  
    if (!container) {
      console.error("Container with id 'useStrix' not found.");
      return;
    }
  
    Object.keys(data).forEach((key) => {
      const element = container.querySelector(`#${key}`);
      if (element) {
        // Update its innerHTML with the corresponding JSON value
        element.innerHTML = data[key as keyof StrixJSON]; // Ensures type safety
      } else {
        console.warn(`Element with id '${key}' not found in container.`);
      }
    });
  }
  
  // Export the function as the default export
  export default strixAdd;
  