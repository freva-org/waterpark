(async function () {
        const { pathname, origin, search, hash } = window.location;
        if (pathname.match(/(index.html|\/?)$/) == null) {
          window.location.href = `${origin}${pathname}/${search}${hash}`;
          return;
        }
        await import(
          '../config-utils.js?_=972d001'
        );
      }.call(this));
