export const useDetectOBS = () => {
  if (typeof window === undefined) return false

  // @ts-expect-error Injected Global
  if (window.obsstudio) return true

  return false
}
