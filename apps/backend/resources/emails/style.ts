// backend/emails/styles.ts
export const main = { backgroundColor: '#ffffff' }
export const container = { paddingLeft: '12px', paddingRight: '12px', margin: '0 auto' }
export const header = { padding: '20px' }
export const background = { backgroundColor: '#5D7B6F', padding: '48px 32px', textAlign: 'center' as const }

export const offerBadge = {
  backgroundColor: '#ff6b6b',
  color: '#ffffff',
  padding: '8px 16px',
  borderRadius: '20px',
  display: 'inline-block',
  marginBottom: '20px',
}

export const offerBadgeText = {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '1px',
  margin: '0',
  textTransform: 'uppercase' as const,
  color: '#ffffff',
}