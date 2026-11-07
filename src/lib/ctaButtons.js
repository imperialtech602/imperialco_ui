export function buttonsFromCta(cta = {}) {
  if (Array.isArray(cta.buttons) && cta.buttons.length) {
    return cta.buttons.map((button) => ({
      label: button.label || '',
      to: button.to || '',
    }))
  }

  const buttons = []
  if (cta.primaryLabel || cta.primaryTo) {
    buttons.push({ label: cta.primaryLabel || '', to: cta.primaryTo || '' })
  }
  if (cta.secondaryLabel || cta.secondaryTo) {
    buttons.push({ label: cta.secondaryLabel || '', to: cta.secondaryTo || '' })
  }
  return buttons
}

export function visibleCtaButtons(cta = {}) {
  return buttonsFromCta(cta).filter((button) => button.label.trim())
}
