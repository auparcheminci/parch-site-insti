export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const response = await $fetch(`${config.public.strapiUrl}/api/catalogues`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${config.strapiToken}`
    }
  })

  return response
})
