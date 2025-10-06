# Events Components

Componentes modulares para la gestión de eventos en BookMatch.

## Estructura

```
events/
├── EventsHeader.tsx        # Header con tabs y búsqueda
├── EventFilters.tsx        # Filtros por categoría
├── EventCard.tsx           # Tarjeta de evento individual
├── CreateEventDialog.tsx   # Modal para crear eventos
├── index.ts                # Barrel exports
└── README.md               # Esta documentación
```

## Componentes

### EventsHeader

Header de la página con título, tabs de navegación y barra de búsqueda.

**Props:**
```typescript
interface EventsHeaderProps {
  currentTab: number;
  searchQuery: string;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
```

**Uso:**
```tsx
<EventsHeader
  currentTab={currentTab}
  searchQuery={searchQuery}
  onTabChange={(e, newValue) => setCurrentTab(newValue)}
  onSearchChange={(e) => setSearchQuery(e.target.value)}
/>
```

### EventFilters

Chips de categorías para filtrar eventos.

**Props:**
```typescript
interface EventFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}
```

**Uso:**
```tsx
<EventFilters
  selectedCategory={selectedCategory}
  onCategoryChange={setSelectedCategory}
/>
```

### EventCard

Tarjeta que muestra la información de un evento individual.

**Props:**
```typescript
interface EventCardProps {
  event: Event;
  index: number;
  isFavorite: boolean;
  isOwnEvent: boolean;
  onToggleFavorite: (eventId: string | number) => void;
  onDelete?: (eventId: string, eventImage: string) => void;
}
```

**Uso:**
```tsx
<EventCard
  event={event}
  index={index}
  isFavorite={favorites.includes(event.id)}
  isOwnEvent={event.host?.userId === user.id}
  onToggleFavorite={toggleFavorite}
  onDelete={handleDeleteEvent}
/>
```

### CreateEventDialog

Modal para crear nuevos eventos con upload de imagen.

**Props:**
```typescript
interface CreateEventDialogProps {
  open: boolean;
  creating: boolean;
  newEvent: NewEventForm;
  imagePreview: string;
  onClose: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEventChange: (event: Partial<NewEventForm>) => void;
  onSubmit: () => void;
}
```

**Uso:**
```tsx
<CreateEventDialog
  open={openCreateDialog}
  creating={creating}
  newEvent={newEvent}
  imagePreview={imagePreview}
  onClose={() => setOpenCreateDialog(false)}
  onImageChange={handleImageChange}
  onEventChange={handleEventChange}
  onSubmit={handleCreateEvent}
/>
```

## Tipos

Ver `/src/types/events.ts` para las definiciones de tipos:

- `Event`: Estructura de un evento
- `EventHost`: Información del organizador
- `NewEventForm`: Formulario de creación
- `EVENT_CATEGORIES`: Categorías disponibles

## Mock Data

Los eventos de ejemplo se encuentran en `/src/data/mockEvents.ts`.

## Refactorización

Este módulo es resultado de la refactorización de EventsPage.tsx:

- **Antes**: 1014 líneas en un solo archivo
- **Después**: 301 líneas + componentes modulares
- **Reducción**: ~70% en el archivo principal

### Beneficios:

- Código más mantenible
- Componentes reutilizables
- Mejor separación de responsabilidades
- Facilita testing
- Tipado fuerte con TypeScript
