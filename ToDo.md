# Bug



# 기능개선
* localStorage 저장시 암호화.
    * Lucia Auth의 사용자 세션에서 파생된 키(ex: hashed user ID)



# Error 처리방식
* use toast message or modal
## where?
* isLocalStorageAvailable() in lib/utils/localStorage.ts
