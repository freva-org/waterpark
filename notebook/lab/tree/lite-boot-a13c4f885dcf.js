// redirect to /lab by default
      (function () {
        window.location.href = window.location.href.replace(
          /(\/tree\/(index\.html)?)/,
          '/index.html'
        );
      }.call(this));
