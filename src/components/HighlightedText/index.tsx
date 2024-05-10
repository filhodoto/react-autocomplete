// Component to implement highlight in suggested text
const HighlightedText = ({
  text,
  searchText,
}: {
  text: string;
  searchText: string;
}): JSX.Element => {
  // Escape special characters for security measures
  const escapedSearchText = searchText.replace(
    /[-[\]{}()*+?.,\\^$|:]/g,
    '\\$&'
  );

  const regex = new RegExp(`(${escapedSearchText})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => (
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
