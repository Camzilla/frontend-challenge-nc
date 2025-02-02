import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TimeConverterService {
  toPrettyDisplayString(t: number): string {
    const secondsInMillisecond = 1000
    const minutesInSecond = 60
    const hoursInMinute = 60
    const daysInHour = 24

    const day = secondsInMillisecond * minutesInSecond * hoursInMinute * daysInHour
    const hour = secondsInMillisecond * minutesInSecond * hoursInMinute
    const minute = secondsInMillisecond * minutesInSecond

    const days = Math.floor(t / day)
    const hours = Math.floor((t % day) / hour)
    const minutes = Math.floor((t % hour) / minute)
    const seconds = Math.floor((t % minute) / secondsInMillisecond)

    return `${days} days, ${hours} h, ${minutes} m, ${seconds} s`
  }
}
