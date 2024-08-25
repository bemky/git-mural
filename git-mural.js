import dayjs from './node_modules/dayjs/esm/index.js';
import weekOfYear from './node_modules/dayjs/esm/plugin/weekOfYear/index.js';
import weekYear from './node_modules/dayjs/esm/plugin/weekYear/index.js';
import isLeapYear from './node_modules/dayjs/esm/plugin/isLeapYear/index.js';
import IsoWeek from './node_modules/dayjs/esm/plugin/IsoWeek/index.js';

dayjs.extend(weekOfYear)
dayjs.extend(isLeapYear)
dayjs.extend(IsoWeek)
dayjs.extend(weekYear)

export default class GitMural extends HTMLElement {
    
    connectedCallback () {
        const startDate = dayjs('2008-01-01')
        const now = dayjs()
        
        let cursor = startDate
        let previous = cursor
        let currentYearElement;
        let week = 1
        do {
            if (!currentYearElement || cursor.get('year') != previous.get('year')) {
                week = 1
                currentYearElement = document.createElement('year')
                this.append(currentYearElement)
                const label = document.createElement('year-label')
                label.innerHTML = cursor.get('year')
                currentYearElement.append(label)
            }
            if (cursor.day() == 0 && cursor.date() != 1) {
                week += 1
            }
            const dayElement = document.createElement('day');
            dayElement.style.gridColumn = week + 1
            dayElement.style.gridRow = cursor.day() + 1
            dayElement.classList.add('intensity-' + Math.ceil(Math.random() * 5))
            dayElement.title = cursor.format('YYYY-MM-DD')
            currentYearElement.append(dayElement)
            
            previous = cursor
            cursor = cursor.add(1, 'day')
        } while (cursor < now)
    }
}
window.customElements.define('git-mural', GitMural)