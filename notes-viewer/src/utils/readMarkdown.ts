export const readMarkdown = async (path: string): Promise<string> => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return '# Error\n\nFailed to load the markdown file.';
  }
}; 