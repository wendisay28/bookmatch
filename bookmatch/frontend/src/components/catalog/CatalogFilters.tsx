import {
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface CatalogFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedGenre: string;
  onGenreChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  genres: string[];
}

const CatalogFilters = ({
  searchTerm,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  sortBy,
  onSortChange,
  genres,
}: CatalogFiltersProps) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            placeholder="Buscar por título, autor o ISBN..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Género</InputLabel>
            <Select
              value={selectedGenre}
              label="Género"
              onChange={(e) => onGenreChange(e.target.value)}
            >
              {genres.map(genre => (
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Ordenar por</InputLabel>
            <Select
              value={sortBy}
              label="Ordenar por"
              onChange={(e) => onSortChange(e.target.value)}
            >
              <MenuItem value="title">Título (A-Z)</MenuItem>
              <MenuItem value="author">Autor (A-Z)</MenuItem>
              <MenuItem value="price-asc">Precio (Menor a Mayor)</MenuItem>
              <MenuItem value="price-desc">Precio (Mayor a Menor)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CatalogFilters;
