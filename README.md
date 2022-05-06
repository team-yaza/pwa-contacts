# PWA 연락처 앱

PWA를 공부하기 위한 프로젝트 입니다!

## Service Worker LifeCycle

1. 브라우저가 서비스 워커를 지원할 수도, 안 할수도 있다.
2. 일단 서비스 워커를 지원하고 등록이 완료되면 Install event가 발생한다.
3. Service worker active
4. active event 발생
5. Service worker listens for events

![image](https://user-images.githubusercontent.com/63354527/166856289-056c44bf-2cbc-4b66-8161-672f3ad79202.png)

## Git flow

![image](https://user-images.githubusercontent.com/63354527/166854992-6418300a-2880-4ce2-9515-bf5f3e3c6d77.png)

이 프로젝트에서는 git flow를 연습합니다!

```sh
git flow feature start <feature-name> # 새로운 기능을 추가하기 위한 feature/<feature-name> 브랜치를 생성한다.
git rebase -i HEAD~3 # 3개의 커밋 메시지를 합쳐준다 만약에 2개를 합치고 싶으면 2를 적으면 된다.
# 로컬 커밋을 합치면 원격 저장소와 커밋내용이 달라짐
git push -f origin feature/<feature-name> # 원격에 강제 푸쉬
git flow feature finish <feature-name> # feature브랜치를 develop에 머지
```

## 공부자료

- [Frameworks and Tools for Progressive Web Apps (GDD India '17)](https://youtu.be/Da0EjdG5DlE)
