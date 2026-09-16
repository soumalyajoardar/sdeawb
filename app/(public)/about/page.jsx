import { Building2, Award, History, Target, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      <section className="bg-brand-950 text-white py-16 lg:py-24 relative overflow-hidden border-b-4 border-amber-500">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-[100rem] mx-auto px-4 sm:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif mb-6">About SDEA.WB</h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl leading-relaxed font-light">
            Founded in 1971, the Society for Development of Engineers' &amp; Architects' West Bengal is the apex organization fighting for the Pay, Prestige &amp; Promotion of technocrats.
          </p>
        </div>
      </section>

      <section className="max-w-[100rem] mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-600 font-bold mb-4 uppercase tracking-wider text-sm">
                <History className="w-5 h-5" /> Our History &amp; Formation
              </div>
              <h2 className="text-3xl font-black text-brand-950 font-serif mb-6">Why and How We Were Formed</h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-loose space-y-6 text-justify">
                <p>In Pre 1970 there was only one organization of Sub-Assistant Engineer (D.E) in West Bengal was Subordinate Engineering Service Association (W.B.S.E.S.A). At the time of United Front Govt. in West Bengal in the year 1967, 1st Pay Commission was formed. The then Leadership had submitted a Memorandum to the Hon&apos;ble Pay Commission ignoring all norms of "Need based Minimum Wage" regarding Pay Structure of Sub-Assistant Engineers (D.E). They demanded Pay Scale of S.A.E is Rs. 370 - 700/- (20 yrs. Span). Before that Pay Scale of S.A.E&apos;s was Rs. 200 - 400/-.</p>
                <p>The Pay Commission (1967-69) recommended the Pay Scale of Rs. 350 - 600/- but the Govt. accepted the Pay Scale of Rs. 300 - 600/- for the S.A.E along with Surveyor and Draftsman. The remarks of Late Mr. K. G. Bose, one of the Member of the said Pay Commission were "Sub-Assistant Engineers and Estimators are holders of L.C.E, L.M.E or L.E.E diploma. The first three categories of Draftsman and Surveyor have also technical qualification. Their work is the same and similar nature. There does not seem to be any justification for a difference in the Pay Scales".</p>
                <p>After the publication of the Report of Hon&apos;ble Pay Commission, the S.A.E&apos;s were very much aggrieved and agitation begun in different places of the State. The High Profile Leadership of the then W.B.S.E.S.A not only debarred some vocal Personalities from the Association but also ceased their Primary Membership. In the year 1970, the debarred Personalities thought that they should do some thing for the Diploma Engineers. Accordingly, they formed a Committee in the name of "West Bengal Sub-Assistant Engineers Fighting Committee". As a result, large numbers of Sub-Assistant Engineers all over the State joined at this Committee to strengthen it. In December, 1971 a Convention was held at Kalighat and from that Convention "West Bengal Sub-Assistant Engineers&apos; Association came into light.</p>
                <p>The aims and objects of the Association will be JUSTICE, LIBERTY, EQUALITY AND FRATERNITY as well as Pay, Prestige &amp; Promotion for the S.A.E Cadre. In 1973, we took the Affiliation of A.I.F.O.D.E, the only Organisation of Diploma Engineers all over the Country and are free from any Political overlook. After observing the activities of A.I.F.O.D.E, we felt that we are to fight against the vindictive attitude of the W.B.S.E.S.A as well as Govt., we should formed a United front of Diploma Engineers working in different sectors in the State. We got the inspiration from our beloved Federal Leader Er. S. P. Mohanty in this issue. Accordingly, on our hole hearted effort "STATE FEDERATION OF ASSOCIATIONS OF DIPLOMA ENGINEERS, WEST BENGAL" was formed in the year 1974 where Er. S. P. Mohanty from A.I.F.O.D.E and Er. P. B. Karmakar of Assam were present along with 3 (Three) other Organisation of Diploma Engineers of the State. In 1976, S.F.A.D.E, West Bengal took the affiliation of A.I.F.O.D.E.</p>
                <p>In 1980, a question was raised by our Members who got promoted to the rank of Assistant Engineer, how we could continue our Membership of the Parent Organisation, i.e., West Bengal Sub-Assistant Engineers&apos; Association of S.A.E. The issue was a vital one and it was thoroughly discussed in the Annual Conference in 1981 (which is the Supreme body of the Association) and the present name (W.B.S.A.E.A) will be renamed as "STATE DIPLOMA ENGINEERS&apos; ASSOCIATION, WEST BENGAL" was approved unanimously.</p>
                <p>Formation of Society for bonding between technocrats of different designated officials who perform similar nature of work. Basically SDEA is a professional organization for the Engineers that may focus on any disciplines including Architects and serve as an umbrella organization. In the Annual General Meeting at Mahajati Sadan, Kolkata in December 2017 the nomenclature of our beloved organization has been changed as "Society for Development of Engineers&apos; &amp; Architects&apos; West Bengal" keeping the same word, SDEA WB to accommodate all the Engineering Cadres to adopt social activities and stretching the hand to previllaged like community not only under the Government of West Bengal apart from that off.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="inline-flex items-center gap-2 text-brand-700 font-bold mb-4 uppercase tracking-wider text-sm">
                <Target className="w-5 h-5" /> Core Philosophy
              </div>
              <h3 className="text-2xl font-black text-brand-950 mb-6">Aims &amp; Objectives</h3>
              <ul className="space-y-4">
                {[
                  'Justice, Liberty, Equality, and Fraternity.',
                  'Pay, Prestige & Promotion for the S.A.E Cadre.',
                  'Bonding between technocrats of different designated officials.',
                  'Professional growth across all engineering disciplines.',
                  'Adopt social activities to help the underprivileged.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}