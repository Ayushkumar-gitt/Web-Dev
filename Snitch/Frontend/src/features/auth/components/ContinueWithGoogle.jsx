import React from 'react'

const ContinueWithGoogle = () => {
    return (
        <a
            href="/auth/google"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '8px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                backgroundColor: '#fff',
                color: '#111827',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 600,
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                textDecoration: 'none',
            }}
        >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                    fill="#4285F4"
                    d="M21.6 12.23c0-.79-.07-1.54-.2-2.27H12v4.3h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.33 2.98-7.55Z"
                />
                <path
                    fill="#34A853"
                    d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z"
                />
                <path
                    fill="#FBBC05"
                    d="M6.41 13.91A6.02 6.02 0 0 1 6.41 10.1V7.52H3.07a10 10 0 0 0 0 12.78l3.34-2.58Z"
                />
                <path
                    fill="#EA4335"
                    d="M12 6.04c1.47 0 2.8.5 3.84 1.49l2.88-2.88A9.96 9.96 0 0 0 12 2a10 10 0 0 0-8.93 5.52l3.34 2.58C7.2 7.8 9.4 6.04 12 6.04Z"
                />
            </svg>
            <span>Continue with Google</span>
        </a>
    )
}

export default ContinueWithGoogle
