
export default function getRecommendation(FOS, Soil, WaterTable, rainfall) {
    var cases = [
        { case: 1, FOSmin: 0.0, FOSmax: 0.2, Soil: "Clay", WaterTable: "High", rainfall: "High", recommendation: "weak slope	Emergency Response Planning." },
        { case: 2, FOSmin: 0.3, FOSmax: 0.5, Soil: "Clay", WaterTable: "High", rainfall: "High", recommendation: "weak slope	Avoid overloading" },
        { case: 3, FOSmin: 0.6, FOSmax: 0.8, Soil: "Clay", WaterTable: "High", rainfall: "High", recommendation: "intermediate	proper compaction and grading" },
        { case: 4, FOSmin: 0.9, FOSmax: 1.0, Soil: "Clay", WaterTable: "High", rainfall: "High", recommendation: "intermediate	proper compaction and grading" },
        { case: 5, FOSmin: 1.1, FOSmax: 1.2, Soil: "Clay", WaterTable: "High", rainfall: "High", recommendation: "stable Compliance with Codes and Standards" },
        { case: 6, FOSmin: 1.3, FOSmax: 1.5, Soil: "Clay", WaterTable: "High", rainfall: "High", recommendation: "stable Compliance with Codes and Standards" },
        { case: 7, FOSmin: 1.6, FOSmax: 1.7, Soil: "Clay", WaterTable: "High", rainfall: "High", recommendation: "stable	Compliance with Codes and Standards" },
        { case: 8, FOSmin: 0.0, FOSmax: 0.2, Soil: "Loamy", WaterTable: "High", rainfall: "High", recommendation: "weak slope	Avoid overloading" },
        { case: 9, FOSmin: 0.3, FOSmax: 0.5, Soil: "Loamy", WaterTable: "High", rainfall: "High", recommendation: "weak slope Ensure proper compaction and grading during construction to achieve uniform soil density and minimize weak spots in the slope." },
        { case: 10, FOSmin: 0.6, FOSmax: 0.8, Soil: "Loamy", WaterTable: "High", rainfall: "High", recommendation: "intermediate	proper compaction and grading" },
        { case: 11, FOSmin: 0.9, FOSmax: 1.0, Soil: "Loamy", WaterTable: "High", rainfall: "High", recommendation: "intermediate	proper compaction and grading" },
        { case: 12, FOSmin: 1.1, FOSmax: 1.2, Soil: "Loamy", WaterTable: "High", rainfall: "High", recommendation: "stable Compliance with Codes and Standards" },
        { case: 13, FOSmin: 1.3, FOSmax: 1.5, Soil: "Loamy", WaterTable: "High", rainfall: "High", recommendation: "stable Compliance with Codes and Standards" },
        { case: 14, FOSmin: 1.6, FOSmax: 1.7, Soil: "Loamy", WaterTable: "High", rainfall: "High", recommendation: "stable	Compliance with Codes and Standards" },
        { case: 15, FOSmin: 0.0, FOSmax: 0.2, Soil: "Sand", WaterTable: "High", rainfall: "High", recommendation: "Sandy soil Heavy Rainfall	High groundwater table	Lack of vegetation	weak slope	Develop a contingency plan that outlines procedures for assessing and addressing landslide risks in case of emergencies, including evacuation plans and stabilization measures." },
        { case: 16, FOSmin: 0.3, FOSmax: 0.5, Soil: "Sand", WaterTable: "High", rainfall: "High", recommendation: "weak slope Ensure proper compaction and grading during construction to achieve uniform soil density and minimize weak spots in the slope." },
        { case: 17, FOSmin: 0.6, FOSmax: 0.8, Soil: "Sand", WaterTable: "High", rainfall: "High", recommendation: "intermediate	proper compaction and grading" },
        { case: 18, FOSmin: 0.9, FOSmax: 1.0, Soil: "Sand", WaterTable: "High", rainfall: "High", recommendation: "intermediate	proper compaction and grading" },
        { case: 19, FOSmin: 1.1, FOSmax: 1.2, Soil: "Sand", WaterTable: "High", rainfall: "High", recommendation: "stable Compliance with Codes and Standards" },
        { case: 20, FOSmin: 1.3, FOSmax: 1.5, Soil: "Sand", WaterTable: "High", rainfall: "High", recommendation: "stable Compliance with Codes and Standards" },
{ case: 21, FOSmin: 1.6, FOSmax: 1.7, Soil: "Sand", WaterTable: "High", rainfall: "High", recommendation: "stable	Compliance with Codes and Standards" },
{ case: 22, FOSmin: 0.0, FOSmax: 0.2, Soil: "Clay", WaterTable: "Low", rainfall: "Low", recommendation: "weak slope	Emergency Response Planning " },
{ case: 23, FOSmin: 0.3, FOSmax: 0.5, Soil: "Clay", WaterTable: "Low", rainfall: "Low", recommendation: "weak slope	Emergency Response Planning" },
{ case: 24, FOSmin: 0.6, FOSmax: 0.8, Soil: "Clay", WaterTable: "Low", rainfall: "Low", recommendation: "intermediate	proper compaction and grading" },
{ case: 25, FOSmin: 0.9, FOSmax: 1.0, Soil: "Clay", WaterTable: "Low", rainfall: "Low", recommendation: "intermediate	proper compaction and grading" },
{ case: 26, FOSmin: 1.1, FOSmax: 1.2, Soil: "Clay", WaterTable: "Low", rainfall: "Low", recommendation: "stable Compliance with Codes and Standards" },
{ case: 27, FOSmin: 1.3, FOSmax: 1.5, Soil: "Clay", WaterTable: "Low", rainfall: "Low", recommendation: "stable Compliance with Codes and Standards" },
{ case: 28, FOSmin: 1.6, FOSmax: 1.7, Soil: "Clay", WaterTable: "Low", rainfall: "Low", recommendation: "stable	Compliance with Codes and Standards" }
    ]
    for (var i = 0; i < cases.length; i++) {
        var currentcase = cases[i];
        if (FOS >= currentcase.FOSmin && FOS <= currentcase.FOSmax && Soil == currentcase.Soil && WaterTable == currentcase.WaterTable && rainfall == currentcase.rainfall) {
            return currentcase.recommendation;
        }
    }
    
    return "none";
}

