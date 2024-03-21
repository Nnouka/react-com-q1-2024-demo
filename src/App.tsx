import { useEffect, useRef, useState } from 'react'
import './App.css'
import { loadScriptSync } from './utils';
import { googleAuthScriptId, googleAuthScriptSrc, googleBtnId, initGoogle, verifyCredential, type TokenPayload } from './utils/google';

function App() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [auth, setAuth] = useState<TokenPayload | null>(null);
  const [error, setError] = useState('');
  const scriptLoadRef = useRef(false);
  useEffect(() => {
    if (!scriptLoadRef.current) {
      loadScriptSync(googleAuthScriptSrc, googleAuthScriptId).then(() => setScriptLoaded(true));
    }
    scriptLoadRef.current = true
  }, []);
  useEffect(() => {
    if (scriptLoaded) {
      initGoogle({
        config: { width: 300 },
        onGoogleAuth: async (auth) => {
          const payload = await verifyCredential(auth.credential);
          if (payload instanceof Error) {
            setError(payload.message);
          } else if (payload) {
            setAuth(payload);
          }
        },
        googleBtnId: googleBtnId,
      });
    }
  }, [scriptLoaded])
  return (
    <div style={{ width: 600, margin: 'auto' }}>
      {error && <div style={{
          width: '100%',
          height: 450,
          border: '2px solid #d33',
          borderRadius: 8,
          whiteSpace: 'break-spaces'
        }}>{error}</div>}
      { auth && (
        <div style={{
          width: '100%',
          height: 450,
          border: '2px solid #888',
          borderRadius: 8,
          whiteSpace: 'break-spaces'
        }}>
          <img style={{ margin: 'auto', width: '100%', height: 300, objectFit: 'contain' }} src={auth.picture} alt='' />
          <p>{auth.family_name}</p>
          <p>{auth.given_name}</p>
        </div>
      )}
      <button id={googleBtnId} />
    </div>
  )
}

export default App
