# ImageRenderer Quick Reference

## Basic Usage

### Import
```jsx
import { ImageRenderer } from '@/components/ui';
// or
import ImageRenderer from '@/components/ui/ImageRenderer';
```

## Examples

### 1. Simple Remote Image
```jsx
<ImageRenderer 
  src="https://example.com/image.jpg" 
  alt="Description"
/>
```

### 2. Local Image
```jsx
<ImageRenderer 
  src="/images/avatar.jpg" 
  alt="User Avatar"
/>
```

### 3. Hero Image with Custom Settings
```jsx
<ImageRenderer
  src="/images/hero.jpg"
  alt="Hero Banner"
  aspectRatio="16/9"
  objectFit="cover"
  quality={90}
  useLazyLoad={false}
/>
```

### 4. Thumbnail with Disabled Animations
```jsx
<ImageRenderer
  src="/images/thumb.jpg"
  alt="Thumbnail"
  width={64}
  height={64}
  aspectRatio="1/1"
  animated={false}
/>
```

### 5. With Custom Fallback
```jsx
<ImageRenderer
  src="/images/profile.jpg"
  alt="Profile"
  fallbackGradient="from-purple-500 to-pink-600"
  fallbackOptions={{
    bgColor: 'a855f7',
    text: 'Profile'
  }}
/>
```

### 6. With Event Handlers
```jsx
<ImageRenderer
  src="/images/photo.jpg"
  alt="Photo"
  onLoad={() => console.log('Image loaded')}
  onError={(e) => console.log('Load failed', e)}
/>
```

### 7. Contained in a Card
```jsx
<ImageRenderer
  src={project.image}
  alt={project.title}
  className="rounded-lg shadow-md"
  aspectRatio="16/9"
/>
```

## Props Reference

| Prop | Type | Default | Example |
|------|------|---------|---------|
| `src` | string | - | `"/images/img.jpg"` |
| `alt` | string | `'Image'` | `"Profile Picture"` |
| `className` | string | `''` | `"rounded-lg"` |
| `aspectRatio` | string | `'auto'` | `"16/9"`, `"1/1"` |
| `objectFit` | string | `'cover'` | `"contain"`, `"fill"` |
| `objectPosition` | string | `'center'` | `"top"`, `"bottom"` |
| `loading` | string | `'lazy'` | `"eager"` |
| `quality` | number | `85` | `70`, `95` |
| `width` | number | - | `400`, `200` |
| `height` | number | - | `300`, `200` |
| `animated` | boolean | `true` | `false` |
| `useLazyLoad` | boolean | `true` | `false` |
| `fallbackGradient` | string | `'from-blue-500 to-purple-600'` | Any Tailwind gradient |
| `onLoad` | function | - | `() => {}` |
| `onError` | function | - | `(e) => {}` |

## Common Patterns

### Image Grid
```jsx
<div className="grid grid-cols-3 gap-4">
  {images.map((img, idx) => (
    <ImageRenderer
      key={idx}
      src={img}
      alt={`Image ${idx + 1}`}
      aspectRatio="1/1"
    />
  ))}
</div>
```

### Lazy Load with Loading State
```jsx
const [isLoading, setIsLoading] = useState(true);

<ImageRenderer
  src="/images/photo.jpg"
  alt="Photo"
  onLoad={() => setIsLoading(false)}
  className={isLoading ? 'opacity-50' : 'opacity-100'}
/>
```

### Responsive Image
```jsx
<ImageRenderer
  src="/images/responsive.jpg"
  alt="Responsive"
   aspectRatio="16/9"
  className="w-full h-auto"
/>
```

### Image with Link
```jsx
<a href="/gallery">
  <ImageRenderer
    src="/images/gallery-thumb.jpg"
    alt="Gallery"
    className="hover:opacity-75 transition-opacity"
  />
</a>
```

## Utility Functions

### Check Image Type
```jsx
import { isRemoteImage, isLocalImage, getImageType } from '@/utils/imageHandlerUtils';

isRemoteImage('https://example.com/img.jpg'); // true
isLocalImage('/images/avatar.jpg'); // true
getImageType('/images/img.jpg'); // 'local'
```

### Preload Images
```jsx
import { preloadImages } from '@/utils/imageHandlerUtils';

await preloadImages([
  '/images/hero.jpg',
  'https://cdn.example.com/badge.png'
]);
```

### Generate Fallback
```jsx
import { getFallbackImage } from '@/utils/imageHandlerUtils';

const fallbackUrl = getFallbackImage('Image Not Found', {
  width: 400,
  height: 300,
  bgColor: 'e11d48'
});
```

## CSS Classes to Style

### Container
```css
.image-renderer {
  display: flex;
  overflow: hidden;
}
```

### Image
```css
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Accessibility Tips

✅ Always provide meaningful `alt` text
✅ Use semantic aspect ratios
✅ Ensure sufficient color contrast
✅ Support dark mode with appropriate gradients

## Performance Tips

⚡ Use `useLazyLoad={true}` for below-the-fold images
⚡ Set appropriate `quality` (70-85 for thumbnails, 85-95 for hero)
⚡ Disable lazy load for above-the-fold content
⚡ Use `animated={false}` for multiple rapid renders

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Image not loading | Check `src` path and file exists |
| Fallback always showing | Verify image file or URL access |
| Images not lazy loading | Ensure image is below fold and `useLazyLoad={true}` |
| Layout shift | Specify `aspectRatio` prop |
| Dark mode issues | Adjust `fallbackGradient` colors |

## Need More Details?

See [IMAGE_HANDLING_GUIDE.md](./IMAGE_HANDLING_GUIDE.md) for comprehensive documentation.
