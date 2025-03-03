# Bug



# 기능개선
* localStorage 저장시 암호화. === Done.
    * Lucia Auth의 사용자 세션에서 파생된 키(ex: hashed user ID)
    * lucia-auth가 lib형태아님. 로직이 svelte project 설치시에 제공됨.
        * 구현은 각자 알아서. 핵심 로직만 제공. like lego-block.
        * oslo, arctic으로 제공
        * oslo == auth, arctic == OAuth
* migrate to oslo/crypto.
* userID + salt로.
* All modified code is in the Grok. ---> Just Copy & Paste.



# Error 처리방식
* use toast message or modal
## where?
* isLocalStorageAvailable() in lib/utils/localStorage.ts
