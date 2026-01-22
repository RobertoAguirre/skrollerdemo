// WordPress Headless CMS Configuration
export const WORDPRESS_CONFIG = {
  // This will be configured during deployment
  API_URL: import.meta.env.VITE_WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2',
  // Enable/disable WordPress integration
  ENABLED: import.meta.env.VITE_WORDPRESS_ENABLED === 'true' || false,
}

// WordPress API endpoints
export const WORDPRESS_ENDPOINTS = {
  posts: '/posts',
  pages: '/pages',
  media: '/media',
  categories: '/categories',
  tags: '/tags',
  customPostTypes: {
    // Add custom post types here as needed
    // Example: projects: '/projects'
  }
}

// Fetch WordPress content
export async function fetchWordPressContent(endpoint: string, params?: Record<string, string>) {
  if (!WORDPRESS_CONFIG.ENABLED) {
    console.warn('WordPress integration is disabled')
    return null
  }

  try {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
    const response = await fetch(`${WORDPRESS_CONFIG.API_URL}${endpoint}${queryString}`)
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching WordPress content:', error)
    return null
  }
}

// Fetch WordPress posts
export async function fetchPosts(params?: { per_page?: number; page?: number; categories?: number[] }) {
  const queryParams: Record<string, string> = {}
  if (params?.per_page) queryParams.per_page = params.per_page.toString()
  if (params?.page) queryParams.page = params.page.toString()
  if (params?.categories) queryParams.categories = params.categories.join(',')
  
  return fetchWordPressContent(WORDPRESS_ENDPOINTS.posts, queryParams)
}

// Fetch WordPress pages
export async function fetchPage(slug: string) {
  return fetchWordPressContent(WORDPRESS_ENDPOINTS.pages, { slug })
}

// Fetch WordPress media
export async function fetchMedia(mediaId: number) {
  return fetchWordPressContent(`${WORDPRESS_ENDPOINTS.media}/${mediaId}`)
}
