// trial.js - client-side helpers for 3-day trial banner and blocking modal
(function () {
  const TRIAL_BLOCK_ID = 'trial-block-overlay';
  const TRIAL_BANNER_ID = 'trial-banner-top';

  // Free trial logic removed. No trial allowed. Only block expired users.
    overlay.style.top = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.zIndex = '99999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.background = 'rgba(0,0,0,0.5)';

    const box = document.createElement('div');
    box.style.background = '#fff';
    box.style.padding = '24px';
    box.style.borderRadius = '12px';
    box.style.maxWidth = '420px';
    box.style.textAlign = 'center';
    box.style.boxShadow = '0 10px 40px rgba(2,6,23,0.3)';

    const title = document.createElement('h2');
    title.innerText = 'Subscription Required';
    title.style.marginBottom = '8px';
    title.style.fontSize = '18px';
    title.style.fontWeight = '700';

    const p = document.createElement('p');
    p.innerText = message || 'Your free trial has ended. Subscribe now to continue using this page.';
    p.style.marginBottom = '16px';
    p.style.color = '#334155';

    const subscribeBtn = document.createElement('a');
    subscribeBtn.href = 'payment.html';
    subscribeBtn.innerText = 'Subscribe Now';
    subscribeBtn.style.background = '#4f46e5';
    subscribeBtn.style.color = '#fff';
    subscribeBtn.style.padding = '10px 14px';
    subscribeBtn.style.borderRadius = '8px';
    subscribeBtn.style.marginRight = '8px';
    subscribeBtn.style.display = 'inline-block';

    const logoutBtn = document.createElement('a');
    logoutBtn.href = 'login.html';
    logoutBtn.innerText = 'Log Out';
    logoutBtn.style.background = '#fff';
    logoutBtn.style.color = '#4f46e5';
    logoutBtn.style.padding = '10px 14px';
    logoutBtn.style.borderRadius = '8px';
    logoutBtn.style.display = 'inline-block';
    logoutBtn.style.border = '1px solid #e6e6ff';

    box.appendChild(title);
    box.appendChild(p);
    const btnWrap = document.createElement('div');
    btnWrap.appendChild(subscribeBtn);
    btnWrap.appendChild(logoutBtn);
    box.appendChild(btnWrap);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  // Expose globally
  window.startTrialBanner = startBannerTimer;
  window.blockPageWithSubscribe = blockPageWithSubscribe;
  window.createTrialBanner = createBanner;
})();
