// Component to implement highlight in suggested text
// * NOTE:: This logic is necessary to avoid using dangerouslySetInnerHTML, which can expose your application to cross-site scripting (XSS) attacks
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
      {textParts.map((part, index) =>
        part.toLowerCase() === searchText.toLowerCase() ? (
          <mark key={index}>{part}</mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

export default HighlightedText;
