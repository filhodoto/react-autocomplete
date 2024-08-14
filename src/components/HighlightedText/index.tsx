// Component to implement highlight in suggested text
const HighlightedText = ({
  text,
  searchText,
}: {
  text: string;
  searchText: string;
}): JSX.Element => {
  // Escape special characters for security measures
  // eg: user could inject malicious code into the search text
  const escapedSearchText = searchText.replace(
    /[-[\]{}()*+?.,\\^$|:]/g,
    '\\$&'
  );

  // Create a regular expression for matching the search text**
  const regex = new RegExp(`(${escapedSearchText})`, 'gi');

  // Split the text into textParts based on the search text
  const textParts = text.split(regex);
  return (
    <>
      {/* Iterate over the textParts and highlight the search text */}
      {textParts.map((part, index) => (
        <span key={index}>
          {part.toLowerCase() === searchText.toLowerCase() ? (
            <mark>{part}</mark>
          ) : (
            part
          )}
        </span>
      ))}
    </>
  );
};

export default HighlightedText;
