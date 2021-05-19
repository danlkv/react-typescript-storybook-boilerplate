import {Measure} from '../src/lib/Measure'
import {expect} from 'chai'

describe('Measure', ()=>{
    describe('without Heartbeat', ()=>{
        describe('total duration', ()=>{
            it('closes active session correctly', () => {
                const m = new Measure('test', 0)
                m.record(1, new Date(1999, 5, 12, 0, 10))
                m.closeActiveSession(new Date(1999, 5, 12, 0, 12))
                expect(m.getTotalDuration()).to.equal(2 * 60 * 1000)
            })
            it('switches sessions when record value changes', () => {
                const m = new Measure('test', 0)
                m.record(1, new Date(1999, 5, 12, 0, 10))
                m.record(1, new Date(1999, 5, 12, 0, 15))
                m.record(2, new Date(1999, 5, 12, 0, 25))
                m.record(2, new Date(1999, 5, 12, 0, 30))
                m.closeActiveSession(new Date(1999, 5, 12, 0, 32))
                expect(m.getTotalDuration()).to.equal(22 * 60 * 1000)
                expect(m.getSessions().length).to.equal(2)
            })
        })
    })

    describe('With Heartbeat', ()=>{
        describe('Total duration', ()=>{
            it('When session is un-closed, total duration is <= than heartbeat', () => {
                const m = new Measure('test', 5*1000)
                expect(m.getTotalDuration()).to.equal(0)
                m.record(1, new Date(1999, 5, 12, 0, 10))
                expect(m.getTotalDuration()).to.equal(5*1000)
                m.record(1, new Date(1999, 5, 12, 0, 10, 3))
                expect(m.getTotalDuration()).to.equal(8 * 1000)
            })
            it('switches sessions correctly with rare events', () => {
                const m = new Measure('test', 5*1000)
                m.record(1, new Date(1999, 5, 12, 0, 10))
                m.record(1, new Date(1999, 5, 12, 0, 15))
                m.record(1, new Date(1999, 5, 12, 0, 15, 3))
                m.record(2, new Date(1999, 5, 12, 0, 30))
                m.closeActiveSession(new Date(1999, 5, 12, 0, 32))
                expect(m.getTotalDuration()).to.equal((5+3+5+5) * 1000)
                expect(m.getSessions().length).to.equal(3)
            })

            it('switches sessions correctly with frequent events', () => {
                const m = new Measure('test', 5*1000)
                m.record(1, new Date(1999, 5, 13, 0, 15))
                m.record(1, new Date(1999, 5, 13, 0, 15, 1))
                m.record(1, new Date(1999, 5, 13, 0, 15, 3))
                m.record(2, new Date(1999, 5, 13, 0, 15, 6))
                m.closeActiveSession()
                expect(m.getTotalDuration()).to.equal((6+5) * 1000)
                expect(m.getSessions().length).to.equal(2)
            })
            it('switches sessions correctly with mixed events', () => {
                const m = new Measure('test', 5*60*1000)
                m.record(1, new Date(1999, 5, 14, 0, 15))
                m.record(1, new Date(1999, 5, 14, 0, 16))
                m.record(1, new Date(1999, 5, 14, 0, 18))

                m.record(1, new Date(1999, 5, 14, 0, 25))
                m.record(1, new Date(1999, 5, 14, 0, 26))

                m.record(2, new Date(1999, 5, 14, 0, 35))
                m.record(2, new Date(1999, 5, 14, 0, 40))
                m.closeActiveSession()
                expect(m.getTotalDuration()).to.equal((3+5+1+5+10) * 60 *1000)
                expect(m.getSessions().length).to.equal(3)
            })
        })
        it('gets value', ()=>{
            const m = new Measure('test', 5*60*1000)
            const v = m.getValueAt(new Date(1999, 6, 13, 0, 0));
            expect(v).to.equal(undefined)
            m.record(1, new Date(1999, 6, 13, 0, 0));
            const v = m.getValueAt(new Date(1999, 6, 13, 0, 2));
            expect(v).to.equal(1)
            const v = m.getValueAt(new Date(1999, 6, 13, 0, 6));
            expect(v).to.equal(undefined)
            m.record(1, new Date(1999, 6, 14, 0, 0));
            m.record(1, new Date(1999, 6, 14, 0, 1));
            m.record(2, new Date(1999, 6, 14, 0, 2));
            m.record(2, new Date(1999, 6, 14, 0, 2));
            m.record(2, new Date(1999, 6, 14, 0, 3));
            m.record(10, new Date(1999, 6, 14, 0, 10));
            const v = m.getValueAt(new Date(1999, 6, 14, 0, 1));
            expect(v).to.equal(1)
            const v = m.getValueAt(new Date(1999, 6, 14, 0, 2));
            expect(v).to.equal(2)
            const v = m.getValueAt(new Date(1999, 6, 14, 0, 7));
            expect(v).to.equal(2)
            const v = m.getValueAt(new Date(1999, 6, 14, 0, 10));
            expect(v).to.equal(10)
        })
    })
})
