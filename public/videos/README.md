# Video Upload Instructions

## How to Add Your Custom Video:

1. **Save your video file** as `your-tea-video.mp4` 
2. **Place it in this folder**: `public/videos/`
3. **Supported formats**: MP4, WebM, OGV
4. **Recommended specs**:
   - Format: MP4 (H.264)
   - Resolution: 1280x720 or 1920x1080
   - Duration: Any length (optimized for tracking)
   - File size: Under 50MB for best performance

## Current Video Path:
```
public/videos/your-tea-video.mp4
```

## Alternative Method:
If you want to use a different filename, update the source in:
`src/pages/Videos.tsx` line 156:
```jsx
<source src="/videos/YOUR_FILENAME.mp4" type="video/mp4" />
```

## Testing:
After adding your video:
1. Refresh the page
2. Navigate to Videos section
3. Play your video to test all tracking events
4. Check Omnibug for tracking data