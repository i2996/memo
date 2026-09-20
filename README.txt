메모 정리 (설치형 웹앱)

이 폴더의 파일을 "그대로" 웹 호스팅(주소가 생기는 곳)에 올리면,
폰 브라우저에서 열었을 때 '앱 설치'가 나와요.

파일
- index.html            앱 본체
- manifest.webmanifest  앱 이름과 아이콘 정보
- sw.js                 오프라인에서도 열리게 하는 파일
- icon-*.png            아이콘

올릴 때 주의
- index.html이 맨 바깥(최상위)에 있어야 해요. 폴더째로 한 겹 더 감싸 올리면 안 돼요.
- 주소는 https로 시작해야 해요. GitHub Pages, Netlify, Cloudflare Pages는 모두 자동으로 https예요.
- 파일을 고쳐서 다시 올릴 땐 sw.js 맨 위의 memo-v1을 memo-v2로 바꿔 주세요.

메모는 열어 본 기기의 브라우저 안에 저장돼요. 기기끼리 자동으로 동기화되지는 않아요.
