interface Props {
  genres: Set<string>;
  error: string;
  isLoading: boolean;
}

const GenreList = ({ genres, error, isLoading }: Props) => {
  return (
    <ul>
      {[...genres].map((genre) => (
        <li key={Math.random()}>{genre}</li>
      ))}
    </ul>
  );
};

export default GenreList;
