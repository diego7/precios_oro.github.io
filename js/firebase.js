<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAju-H61YIzlTYNiW3yoZQVwiiS2jXbe4w",
  authDomain: "cotizacionoro.firebaseapp.com",
  databaseURL: "https://cotizacionoro-default-rtdb.firebaseio.com",
  projectId: "cotizacionoro",
  storageBucket: "cotizacionoro.firebasestorage.app",
  messagingSenderId: "961247625255",
  appId: "1:961247625255:web:98e61c750f615445bb0e02"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
</script>
