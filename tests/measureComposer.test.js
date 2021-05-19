import {MeasureComposer} from '../src/lib/MeasureComposer'
import {Measure, Session } from '../src/lib/Measure'
import {expect} from 'chai'

describe('Measure Composer', ()=>{ 
    it('when map from two measure third measure is calculated correctly', ()=>{
        const mc = new MeasureComposer()
        const A = new Measure('a', 60*1000)
        const B = new Measure('b', 60*1000)
        const C = new Measure('C', )

        mc.map(A, B, C, (a, b)=>{
            if (a != undefined){
                return b
            } else {
                return undefined
            }
        })
        mc.filter(A, C, (ts)=>false)

        let d = C.getTotalDuration()
        expect(d).to.equal(0)

        A.record(1, new Date(1999, 5, 12, 0, 10))
        B.record(1, new Date(1999, 5, 12, 0, 10))
        const v = C.getValueAt(new Date(1999, 5, 12, 0, 10, 1))
        expect(v).to.equal(1)

        A.record(1, new Date(1999, 5, 12, 0, 10, 15))
        B.record(1, new Date(1999, 5, 12, 0, 10, 15))

        B.record(1, new Date(1999, 5, 12, 0, 11))
        B.record(1, new Date(1999, 5, 12, 0, 11, 15))

        B.record(2, new Date(1999, 5, 12, 0, 25))
        A.record(1, new Date(1999, 5, 12, 0, 25, 16))
        B.record(3, new Date(1999, 5, 12, 0, 30))

        A.closeActiveSession()
        console.log(C.getSessions())
        console.log(A.getSessions())
        const sess = A.getSessions()
        const sess = C.getSessions()
        expect(sess.length).to.equal(3)
        const vals  = sess.map(x=>x.value)
        expect(vals).to.deep.equal([1, 2, 3])
    })

})