import React, { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import ImageModule from "docxtemplater-image-module-free";

const Formulario = () => {
  const [step, setStep] = useState(0); // Control del paso actual
const [uploadStatus, setUploadStatus] = useState(""); // estado para mostrar avances de la subida

  //funcion para obtener hora local
  const obtenerFechaLocal = () => {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Meses comienzan en 0
    const año = fecha.getFullYear();
    return `${año}-${mes}-${dia}`;
  };
  //informacion del form 
  const [formData, setFormData] = useState({
    operador: { nombre: "", matricula: "", firma: "" },
    inspector: { nombre: "", matricula: "", firma: "" },
    fecha: obtenerFechaLocal(), // Fecha por defecto
    facilitadoA: "",
    direccion: "",
    localodad:"",
    aeronaveMotor: "",
    matricula: "",
    motorComponente: "",
    parteNumero: "",
    serieNumero: "",
    tsnTso: "",
    ordenDeTrabajo: "",
    informeNumero: "",
    tipoEnsayo: {
      liquidosPenetrantes: false,
      inspeccionVisual: false,
      particulasMagneticas: false,
      corrientesInducidas: false,
      dureza: false,
      boroscopia: false,
      ultrasonidos: false,
      radiografia: false,
    },
    procedimientoAplicable: "",
    metodo: "",
    materiales: {
      removedor: { tipo: "", lote: "", nivel: "", vence: "" },
      penetrante: { tipo: "", lote: "", nivel: "", vence: "" },
      particulas: { tipo: "", lote: "", nivel: "", vence: "" },
      acoplante: { tipo: "", lote: "", nivel: "", vence: "" },
      emulsificador: { tipo: "", lote: "", vence: "" },
      revelador: { tipo: "", lote: "", vence: "" },
      placas: { tipo: "", lote: "", vence: "" },
      fijador: { tipo: "", lote: "", vence: "" },
    },
    luces: {
      ultravioleta: {
        medidor: "",
        modelo: "",
        serie: "",
        vencimiento: "",
        intensidad: "",
      },
      ambiental: {
        medidor: "",
        modelo: "",
        serie: "",
        vencimiento: "",
        intensidad: "",
      },
      blanca: {
        medidor: "",
        modelo: "",
        serie: "",
        vencimiento: "",
        intensidad: "",
      },
    },
    equipamiento: {
      columna1: {
        equipo: "",
        modelo: "",
        serie: "",
        vencimiento: "",
        frecuencia: "",
        ganancia: "",
      },
      columna2: {
        equipo: "",
        modelo: "",
        serie: "",
        vencimiento: "",
        frecuencia: "",
        ganancia: "",
      },
      columna3: {
        equipo: "",
        modelo: "",
        serie: "",
        vencimiento: "",
        frecuencia: "",
        ganancia: "",
      },
      columna4: {
        equipo: "",
        modelo: "",
        serie: "",
        vencimiento: "",
        frecuencia: "",
        ganancia: "",
      },
      columna5: {
        equipo: "",
        modelo: "",
        serie: "",
        vencimiento: "",
        frecuencia: "",
        ganancia: "",
      },
      columna6: {
        equipo: "",
        modelo: "",
        serie: "",
        vencimiento: "",
        frecuencia: "",
        ganancia: "",
      },
      columna7: {
        equipo: "",
        modelo: "",
        serie: "",
        vencimiento: "",
        frecuencia: "",
        ganancia: "",
      },
    },
    txtRdoEnsayo: "",
    resultadosImagen1: "--",
    resultadosImagen2: "--",
    //fotos
    imagendeltrabajo1: "--",
    imagendeltrabajo2: "--",
    imagendeltrabajo3: "--",
    imagendeltrabajo4: "--",
    imagendeltrabajo5: "--",
    imagendeltrabajo6: "--",
    imagendeltrabajo7: "--",
  imagendeltrabajo8: "--",
  imagendeltrabajo9: "--",
  imagendeltrabajo10: "--",
  imagendeltrabajo11: "--",
  imagendeltrabajo12: "--",
  imagendeltrabajo13: "--",
  imagendeltrabajo14: "--",
  imagendeltrabajo15: "--",
  imagendeltrabajo16: "--",
  imagendeltrabajo17: "--",
  imagendeltrabajo18: "--",
  imagendeltrabajo19: "--",
  imagendeltrabajo20: "--",
  });

  
  const handleChange = (e, materialKey = null) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => {
      if (materialKey) {
        return {
          ...prev,
          materiales: {
            ...prev.materiales,
            [materialKey]: {
              ...prev.materiales[materialKey],
              [name]: value,
            },
          },
        };
      } else if (type === "checkbox") {
        return {
          ...prev,
          tipoEnsayo: {
            ...prev.tipoEnsayo,
            [name]: checked,
          },
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const formatFecha = (fecha) => {
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  

  //funcion que toma todos los valores y exporta el doc 1 
  const generarWord = async () => {
   const plantillaURL = `${process.env.PUBLIC_URL}/templates/plantilla.docx`;
     try {
       const response = await fetch(plantillaURL);
       if (!response.ok) throw new Error("No se pudo cargar la plantilla");
       const content = await response.arrayBuffer();
       const zip = new PizZip(content);
       const doc = new Docxtemplater(zip, {
         modules: [loadImageModule()],
         paragraphLoop: true,
         linebreaks: true,
         delimiters: { start: "{{", end: "}}" },
       });

       //intentamos darle valor a todas las variables
      try {
      // Renderizar los datos con renderAsync
      await doc.renderAsync({
        fecha: formatFecha(formData.fecha),
        facilitadoA: formData.facilitadoA || "N/A",
        direccion: formData.direccion || "N/A",
        aeronaveMotor: formData.aeronaveMotor || "N/A",
        matricula: formData.matricula || "N/A",
        motorComponente: formData.motorComponente || "N/A",
        parteNumero: formData.parteNumero || "N/A",
        serieNumero: formData.serieNumero || "N/A",
        tsnTso: formData.tsnTso || "N/A",
        ordenDeTrabajo: formData.ordenDeTrabajo || "N/A",
        informeNumero: formData.informeNumero || "N/A",
        liquidosPenetrantes: formData.tipoEnsayo.liquidosPenetrantes ? "█" : "",
        inspeccionVisual: formData.tipoEnsayo.inspeccionVisual ? "█" : "",
        particulasMagneticas: formData.tipoEnsayo.particulasMagneticas
          ? "█"
          : "",
        corrientesInducidas: formData.tipoEnsayo.corrientesInducidas ? "█" : "",
        dureza: formData.tipoEnsayo.dureza ? "█" : "",
        boroscopia: formData.tipoEnsayo.boroscopia ? "█" : "",
        ultrasonidos: formData.tipoEnsayo.ultrasonidos ? "█" : "",
        radiografia: formData.tipoEnsayo.radiografia ? "█" : "",
        procedimientoAplicable: formData.procedimientoAplicable || "N/A",
        metodo: formData.metodo || "N/A",
        removedorTipo: formData.materiales.removedor.tipo || "N/A",
        removedorLote: formData.materiales.removedor.lote || "N/A",
        removedorNivel: formData.materiales.removedor.nivel || "N/A",
        removedorVence: formData.materiales.removedor.vence || "N/A",
        penetranteTipo: formData.materiales.penetrante.tipo || "N/A",
        penetranteLote: formData.materiales.penetrante.lote || "N/A",
        penetranteNivel: formData.materiales.penetrante.nivel || "N/A",
        penetranteVence: formData.materiales.penetrante.vence || "N/A",
        particulasTipo: formData.materiales.particulas.tipo || "N/A",
        particulasLote: formData.materiales.particulas.lote || "N/A",
        particulasNivel: formData.materiales.particulas.nivel || "N/A",
        particulasVence: formData.materiales.particulas.vence || "N/A",
        acoplanteTipo: formData.materiales.acoplante.tipo || "N/A",
        acoplanteLote: formData.materiales.acoplante.lote || "N/A",
        acoplanteNivel: formData.materiales.acoplante.nivel || "N/A",
        acoplanteVence: formData.materiales.acoplante.vence || "N/A",
        emulsificadorTipo: formData.materiales.emulsificador.tipo || "N/A",
        emulsificadorLote: formData.materiales.emulsificador.lote || "N/A",
        emulsificadorVence: formData.materiales.emulsificador.vence || "N/A",
        reveladorTipo: formData.materiales.revelador.tipo || "N/A",
        reveladorLote: formData.materiales.revelador.lote || "N/A",
        reveladorVence: formData.materiales.revelador.vence || "N/A",
        placasTipo: formData.materiales.placas.tipo || "N/A",
        placasLote: formData.materiales.placas.lote || "N/A",
        placasVence: formData.materiales.placas.vence || "N/A",
        fijadorTipo: formData.materiales.fijador.tipo || "N/A",
        fijadorLote: formData.materiales.fijador.lote || "N/A",
        fijadorVence: formData.materiales.fijador.vence || "N/A",
        luzUltravioletaMedidor: formData.luces.ultravioleta.medidor || "N/A",
        luzUltravioletaModelo: formData.luces.ultravioleta.modelo || "N/A",
        luzUltravioletaSerie: formData.luces.ultravioleta.serie || "N/A",
        luzUltravioletaVencimiento:
          formData.luces.ultravioleta.vencimiento || "N/A",
        luzUltravioletaIntensidad:
          formData.luces.ultravioleta.intensidad || "N/A",
        ambientalMedidor: formData.luces.ambiental.medidor || "N/A",
        ambientalModelo: formData.luces.ambiental.modelo || "N/A",
        ambientalSerie: formData.luces.ambiental.serie || "N/A",
        ambientalVencimiento: formData.luces.ambiental.vencimiento || "N/A",
        ambientalIntensidad: formData.luces.ambiental.intensidad || "N/A",
        blancaMedidor: formData.luces.blanca.medidor || "N/A",
        blancaModelo: formData.luces.blanca.modelo || "N/A",
        blancaSerie: formData.luces.blanca.serie || "N/A",
        blancaVencimiento: formData.luces.blanca.vencimiento || "N/A",
        blancaIntensidad: formData.luces.blanca.intensidad || "N/A",

        // Equipamiento columna 1
        columna1Equipo: formData.equipamiento.columna1.equipo || "N/A",
        columna1Modelo: formData.equipamiento.columna1.modelo || "N/A",
        columna1Serie: formData.equipamiento.columna1.serie || "N/A",
        columna1Vencimiento:
          formData.equipamiento.columna1.vencimiento || "N/A",
        columna1Frecuencia: formData.equipamiento.columna1.frecuencia || "N/A",
        columna1Ganancia: formData.equipamiento.columna1.ganancia || "N/A",

        // Equipamiento columna 2
        columna2Equipo: formData.equipamiento.columna2.equipo || "N/A",
        columna2Modelo: formData.equipamiento.columna2.modelo || "N/A",
        columna2Serie: formData.equipamiento.columna2.serie || "N/A",
        columna2Vencimiento:
          formData.equipamiento.columna2.vencimiento || "N/A",
        columna2Frecuencia: formData.equipamiento.columna2.frecuencia || "N/A",
        columna2Ganancia: formData.equipamiento.columna2.ganancia || "N/A",

        // Equipamiento columna 3
        columna3Equipo: formData.equipamiento.columna3.equipo || "N/A",
        columna3Modelo: formData.equipamiento.columna3.modelo || "N/A",
        columna3Serie: formData.equipamiento.columna3.serie || "N/A",
        columna3Vencimiento:
          formData.equipamiento.columna3.vencimiento || "N/A",
        columna3Frecuencia: formData.equipamiento.columna3.frecuencia || "N/A",
        columna3Ganancia: formData.equipamiento.columna3.ganancia || "N/A",

        // Equipamiento columna 4
        columna4Equipo: formData.equipamiento.columna4.equipo || "N/A",
        columna4Modelo: formData.equipamiento.columna4.modelo || "N/A",
        columna4Serie: formData.equipamiento.columna4.serie || "N/A",
        columna4Vencimiento:
          formData.equipamiento.columna4.vencimiento || "N/A",
        columna4Frecuencia: formData.equipamiento.columna4.frecuencia || "N/A",
        columna4Ganancia: formData.equipamiento.columna4.ganancia || "N/A",

        // Equipamiento columna 5
        columna5Equipo: formData.equipamiento.columna5.equipo || "N/A",
        columna5Modelo: formData.equipamiento.columna5.modelo || "N/A",
        columna5Serie: formData.equipamiento.columna5.serie || "N/A",
        columna5Vencimiento:
          formData.equipamiento.columna5.vencimiento || "N/A",
        columna5Frecuencia: formData.equipamiento.columna5.frecuencia || "N/A",
        columna5Ganancia: formData.equipamiento.columna5.ganancia || "N/A",

        // Equipamiento columna 6
        columna6Equipo: formData.equipamiento.columna6.equipo || "N/A",
        columna6Modelo: formData.equipamiento.columna6.modelo || "N/A",
        columna6Serie: formData.equipamiento.columna6.serie || "N/A",
        columna6Vencimiento:
          formData.equipamiento.columna6.vencimiento || "N/A",
        columna6Frecuencia: formData.equipamiento.columna6.frecuencia || "N/A",
        columna6Ganancia: formData.equipamiento.columna6.ganancia || "N/A",

        // Equipamiento columna 7
        columna7Equipo: formData.equipamiento.columna7.equipo || "N/A",
        columna7Modelo: formData.equipamiento.columna7.modelo || "N/A",
        columna7Serie: formData.equipamiento.columna7.serie || "N/A",
        columna7Vencimiento:
          formData.equipamiento.columna7.vencimiento || "N/A",
        columna7Frecuencia: formData.equipamiento.columna7.frecuencia || "N/A",
        columna7Ganancia: formData.equipamiento.columna7.ganancia || "N/A",

        // PASO 23
        txtRdoEnsayo: formData.txtRdoEnsayo || "N/A",
        // TABLAS EN FORMATO IMG
        resultadosImagen1: formData.resultadosImagen1 || "--",
        resultadosImagen2: formData.resultadosImagen2 || "--",

        //IMAGENES DE SEGUNDA PAGINA
        img1: formData.imagendeltrabajo1 || "--",
  img2: formData.imagendeltrabajo2 || "--",
  img3: formData.imagendeltrabajo3 || "--",
  img4: formData.imagendeltrabajo4 || "--",
  img5: formData.imagendeltrabajo5 || "--",
  img6: formData.imagendeltrabajo6 || "--",
  img7: formData.imagendeltrabajo7 || "--",
  img8: formData.imagendeltrabajo8 || "--",
  img9: formData.imagendeltrabajo9 || "--",
  img10: formData.imagendeltrabajo10 || "--",
  img11: formData.imagendeltrabajo11 || "--",
  img12: formData.imagendeltrabajo12 || "--",
  img13: formData.imagendeltrabajo13 || "--",
  img14: formData.imagendeltrabajo14 || "--",
  img15: formData.imagendeltrabajo15 || "--",
  img16: formData.imagendeltrabajo16 || "--",
  img17: formData.imagendeltrabajo17 || "--",
  img18: formData.imagendeltrabajo18 || "--",
  img19: formData.imagendeltrabajo19 || "--",
  img20: formData.imagendeltrabajo20 || "--",
        operador: formData.operador?.nombre || "N/A",
        firmaOperador: formData.operador?.firma|| "--",
        inspector: formData.inspector?.nombre || "N/A",
        firmaInspector: formData.inspector?.firma || "--",
      });
} catch (renderError) {
  console.error("⛔ Error durante renderAsync:", renderError);
  return; // evitar que intente subir
}

//se crea el documento word
const blob = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
//se le da valores al documento , nombre etc
      const fecha = new Date().toISOString().split('T')[0];
      const nombreCliente = formData.facilitadoA?.replace(/\s+/g, '');
      const customFileName = `${fecha}_INFORME DE ENSAYOS NO DESTRUCTIVOS_${nombreCliente}.docx`;

//se envia el doc al backend para subir a Drive
const archivo = new File([blob], customFileName, {
  type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
});

const formToSend = new FormData();
formToSend.append("file", archivo); 
formToSend.append("customFileName", customFileName);
formToSend.append("folderId", "1iOmJklYBQeQtYKOKqDXIsL6QdGGG2x0-");
setUploadStatus("subiendo");

//si se subio con exito se descarga
  saveAs(blob, customFileName);

  // pruebas para servidor local 
     /*  const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formToSend,
    });*/

   //fetch para correrlo online 

 const res = await fetch("https://aeroend-backendv2.onrender.com/upload", {
      method: "POST",
      body: formToSend,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    const data = await res.json();
    setUploadStatus("exito");
    console.log("✔ Archivo subido a Google Drive. ID:", data.fileId);

  } catch (err) {
    setUploadStatus("error");
    console.error("❌ Error generando/subiendo doc 1:", err.message);
  }
  };


// funcion que exporta documento 2 y guarda todos los valores como el 1
const generarWord2 = async () => {
  const plantillaURL = `${process.env.PUBLIC_URL}/templates/plantilla2.docx`;

  try {
    const response = await fetch(plantillaURL);
    if (!response.ok) throw new Error("No se pudo cargar la plantilla");
    const content = await response.arrayBuffer();
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      modules: [loadImageModule()],
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: "{{", end: "}}" },
    });

      // Renderizar los datos con renderAsync ESTE AWAIT DEBE ESTAR EN CADA BTN Q GUARDE UN DOC
      await doc.renderAsync({
        fecha: formatFecha(formData.fecha),
        facilitadoA: formData.facilitadoA || "N/A",
        direccion: formData.direccion || "N/A",
        localidad: formData.localidad || "N/A",
        aeronaveMotor: formData.aeronaveMotor || "N/A",
        matricula: formData.matricula || "N/A",
        motorComponente: formData.motorComponente || "N/A",
        parteNumero: formData.parteNumero || "N/A",
        serieNumero: formData.serieNumero || "N/A",
        tsnTso: formData.tsnTso || "N/A",
        ordenDeTrabajo: formData.ordenDeTrabajo || "N/A",
        informeNumero: formData.informeNumero || "N/A",
        liquidosPenetrantes: formData.tipoEnsayo.liquidosPenetrantes ? "█" : "",
        inspeccionVisual: formData.tipoEnsayo.inspeccionVisual ? "█" : "",
        particulasMagneticas: formData.tipoEnsayo.particulasMagneticas
          ? "█"
          : "",
        corrientesInducidas: formData.tipoEnsayo.corrientesInducidas ? "█" : "",
        dureza: formData.tipoEnsayo.dureza ? "█" : "",
        boroscopia: formData.tipoEnsayo.boroscopia ? "█" : "",
        ultrasonidos: formData.tipoEnsayo.ultrasonidos ? "█" : "",
        radiografia: formData.tipoEnsayo.radiografia ? "█" : "",
        procedimientoAplicable: formData.procedimientoAplicable || "N/A",
        metodo: formData.metodo || "N/A",
        removedorTipo: formData.materiales.removedor.tipo || "N/A",
        removedorLote: formData.materiales.removedor.lote || "N/A",
        removedorNivel: formData.materiales.removedor.nivel || "N/A",
        removedorVence: formData.materiales.removedor.vence || "N/A",
        penetranteTipo: formData.materiales.penetrante.tipo || "N/A",
        penetranteLote: formData.materiales.penetrante.lote || "N/A",
        penetranteNivel: formData.materiales.penetrante.nivel || "N/A",
        penetranteVence: formData.materiales.penetrante.vence || "N/A",
        particulasTipo: formData.materiales.particulas.tipo || "N/A",
        particulasLote: formData.materiales.particulas.lote || "N/A",
        particulasNivel: formData.materiales.particulas.nivel || "N/A",
        particulasVence: formData.materiales.particulas.vence || "N/A",
        acoplanteTipo: formData.materiales.acoplante.tipo || "N/A",
        acoplanteLote: formData.materiales.acoplante.lote || "N/A",
        acoplanteNivel: formData.materiales.acoplante.nivel || "N/A",
        acoplanteVence: formData.materiales.acoplante.vence || "N/A",
        emulsificadorTipo: formData.materiales.emulsificador.tipo || "N/A",
        emulsificadorLote: formData.materiales.emulsificador.lote || "N/A",
        emulsificadorVence: formData.materiales.emulsificador.vence || "N/A",
        reveladorTipo: formData.materiales.revelador.tipo || "N/A",
        reveladorLote: formData.materiales.revelador.lote || "N/A",
        reveladorVence: formData.materiales.revelador.vence || "N/A",
        placasTipo: formData.materiales.placas.tipo || "N/A",
        placasLote: formData.materiales.placas.lote || "N/A",
        placasVence: formData.materiales.placas.vence || "N/A",
        fijadorTipo: formData.materiales.fijador.tipo || "N/A",
        fijadorLote: formData.materiales.fijador.lote || "N/A",
        fijadorVence: formData.materiales.fijador.vence || "N/A",
        luzUltravioletaMedidor: formData.luces.ultravioleta.medidor || "N/A",
        luzUltravioletaModelo: formData.luces.ultravioleta.modelo || "N/A",
        luzUltravioletaSerie: formData.luces.ultravioleta.serie || "N/A",
        luzUltravioletaVencimiento:
          formData.luces.ultravioleta.vencimiento || "N/A",
        luzUltravioletaIntensidad:
          formData.luces.ultravioleta.intensidad || "N/A",
        ambientalMedidor: formData.luces.ambiental.medidor || "N/A",
        ambientalModelo: formData.luces.ambiental.modelo || "N/A",
        ambientalSerie: formData.luces.ambiental.serie || "N/A",
        ambientalVencimiento: formData.luces.ambiental.vencimiento || "N/A",
        ambientalIntensidad: formData.luces.ambiental.intensidad || "N/A",
        blancaMedidor: formData.luces.blanca.medidor || "N/A",
        blancaModelo: formData.luces.blanca.modelo || "N/A",
        blancaSerie: formData.luces.blanca.serie || "N/A",
        blancaVencimiento: formData.luces.blanca.vencimiento || "N/A",
        blancaIntensidad: formData.luces.blanca.intensidad || "N/A",

        // Equipamiento columna 1
        columna1Equipo: formData.equipamiento.columna1.equipo || "N/A",
        columna1Modelo: formData.equipamiento.columna1.modelo || "N/A",
        columna1Serie: formData.equipamiento.columna1.serie || "N/A",
        columna1Vencimiento:
          formData.equipamiento.columna1.vencimiento || "N/A",
        columna1Frecuencia: formData.equipamiento.columna1.frecuencia || "N/A",
        columna1Ganancia: formData.equipamiento.columna1.ganancia || "N/A",

        // Equipamiento columna 2
        columna2Equipo: formData.equipamiento.columna2.equipo || "N/A",
        columna2Modelo: formData.equipamiento.columna2.modelo || "N/A",
        columna2Serie: formData.equipamiento.columna2.serie || "N/A",
        columna2Vencimiento:
          formData.equipamiento.columna2.vencimiento || "N/A",
        columna2Frecuencia: formData.equipamiento.columna2.frecuencia || "N/A",
        columna2Ganancia: formData.equipamiento.columna2.ganancia || "N/A",

        // Equipamiento columna 3
        columna3Equipo: formData.equipamiento.columna3.equipo || "N/A",
        columna3Modelo: formData.equipamiento.columna3.modelo || "N/A",
        columna3Serie: formData.equipamiento.columna3.serie || "N/A",
        columna3Vencimiento:
          formData.equipamiento.columna3.vencimiento || "N/A",
        columna3Frecuencia: formData.equipamiento.columna3.frecuencia || "N/A",
        columna3Ganancia: formData.equipamiento.columna3.ganancia || "N/A",

        // Equipamiento columna 4
        columna4Equipo: formData.equipamiento.columna4.equipo || "N/A",
        columna4Modelo: formData.equipamiento.columna4.modelo || "N/A",
        columna4Serie: formData.equipamiento.columna4.serie || "N/A",
        columna4Vencimiento:
          formData.equipamiento.columna4.vencimiento || "N/A",
        columna4Frecuencia: formData.equipamiento.columna4.frecuencia || "N/A",
        columna4Ganancia: formData.equipamiento.columna4.ganancia || "N/A",

        // Equipamiento columna 5
        columna5Equipo: formData.equipamiento.columna5.equipo || "N/A",
        columna5Modelo: formData.equipamiento.columna5.modelo || "N/A",
        columna5Serie: formData.equipamiento.columna5.serie || "N/A",
        columna5Vencimiento:
          formData.equipamiento.columna5.vencimiento || "N/A",
        columna5Frecuencia: formData.equipamiento.columna5.frecuencia || "N/A",
        columna5Ganancia: formData.equipamiento.columna5.ganancia || "N/A",

        // Equipamiento columna 6
        columna6Equipo: formData.equipamiento.columna6.equipo || "N/A",
        columna6Modelo: formData.equipamiento.columna6.modelo || "N/A",
        columna6Serie: formData.equipamiento.columna6.serie || "N/A",
        columna6Vencimiento:
          formData.equipamiento.columna6.vencimiento || "N/A",
        columna6Frecuencia: formData.equipamiento.columna6.frecuencia || "N/A",
        columna6Ganancia: formData.equipamiento.columna6.ganancia || "N/A",

        // Equipamiento columna 7
        columna7Equipo: formData.equipamiento.columna7.equipo || "N/A",
        columna7Modelo: formData.equipamiento.columna7.modelo || "N/A",
        columna7Serie: formData.equipamiento.columna7.serie || "N/A",
        columna7Vencimiento:
          formData.equipamiento.columna7.vencimiento || "N/A",
        columna7Frecuencia: formData.equipamiento.columna7.frecuencia || "N/A",
        columna7Ganancia: formData.equipamiento.columna7.ganancia || "N/A",

        // PASO 23
        txtRdoEnsayo: formData.txtRdoEnsayo || "N/A",
        // TABLAS EN FORMATO IMG
        resultadosImagen1: formData.resultadosImagen1 || "",
        resultadosImagen2: formData.resultadosImagen2 || "",

        //IMAGENES DE SEGUNDA PAGINA
        img1: formData.imagendeltrabajo1 || "",
  img2: formData.imagendeltrabajo2 || "",
  img3: formData.imagendeltrabajo3 || "",
  img4: formData.imagendeltrabajo4 || "",
  img5: formData.imagendeltrabajo5 || "",
  img6: formData.imagendeltrabajo6 || "",
  img7: formData.imagendeltrabajo7 || "",
  img8: formData.imagendeltrabajo8 || "",
  img9: formData.imagendeltrabajo9 || "",
  img10: formData.imagendeltrabajo10 || "",
  img11: formData.imagendeltrabajo11 || "",
  img12: formData.imagendeltrabajo12 || "",
  img13: formData.imagendeltrabajo13 || "",
  img14: formData.imagendeltrabajo14 || "",
  img15: formData.imagendeltrabajo15 || "",
  img16: formData.imagendeltrabajo16 || "",
  img17: formData.imagendeltrabajo17 || "",
  img18: formData.imagendeltrabajo18 || "",
  img19: formData.imagendeltrabajo19 || "",
  img20: formData.imagendeltrabajo20 || "",

        operador: formData.operador?.nombre || "N/A",
        firmaOperador: formData.operador?.firma,
        inspector: formData.inspector?.nombre || "N/A",
        firmaInspector: formData.inspector?.firma,
      });

    const blob = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const fecha = new Date().toISOString().split("T")[0];
    const nombreCliente = formData.facilitadoA?.replace(/\s+/g, "");
    const customFileName = `${fecha}_ORDEN DE TRABAJO_${nombreCliente}.docx`;
    

const archivo = new File([blob], customFileName, {
  type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
});
const formToSend = new FormData();
formToSend.append("file", archivo); // <-- ahora sí es un File válido
formToSend.append("customFileName", customFileName);
formToSend.append('folderId', '1dYwqMk9IkPvRQOSXkeXw03Wvj4OYu-YQ'); // ✅ Carpeta de OrdenDeTrabajo

setUploadStatus("subiendo");
saveAs(blob, customFileName);

    // 🔧 LOCAL
    /*const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formToSend,
    });*/

    // ☁️ PRODUCCIÓN (Render)
    
    const res = await fetch("https://aeroend-backendv2.onrender.com/upload", {
      method: "POST",
      body: formToSend,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const data = await res.json();
    setUploadStatus("exito");
    console.log("✔ Archivo subido a Google Drive. ID:", data.fileId);
  } catch (err) {
    setUploadStatus("error");
    console.error("❌ Error generando/subiendo doc 2:", err);
  }
};


  const renderTextareas = () => {
    return (
      <div className="mb-3">
        <div className="mb-3">
          <label className="form-label">Procedimiento Aplicable</label>
          <textarea
            className="form-control"
            name="procedimientoAplicable"
            rows="3"
            placeholder="Ingrese el procedimiento aplicable"
            value={formData.procedimientoAplicable}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Método</label>
          <textarea
            className="form-control"
            name="metodo"
            rows="2"
            placeholder="Ingrese el método"
            value={formData.metodo}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  };

  const renderCheckboxes = () => {
    return (
      <div className="mb-3">
        <h6>Tipo de Ensayo</h6>
        {Object.keys(formData.tipoEnsayo).map((key) => (
          <div key={key} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={key}
              name={key}
              checked={formData.tipoEnsayo[key]}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={key}>
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </label>
          </div>
        ))}
      </div>
    );
  };
  //funcion que renderiza los input para los materiales con 4 input
  const renderMaterialForm = (materialKey, materialLabel) => {
    const materialData = formData.materiales[materialKey] || {};

    return (
      <div className="mb-3">
        <h3 className="text-center mb-4">Material: {materialLabel}</h3>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <input
            type="text"
            className="form-control"
            name="tipo"
            placeholder="Ingrese el tipo"
            value={materialData.tipo}
            onChange={(e) => handleChange(e, materialKey)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Lote</label>
          <input
            type="text"
            className="form-control"
            name="lote"
            placeholder="Ingrese el lote"
            value={materialData.lote}
            onChange={(e) => handleChange(e, materialKey)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nivel</label>
          <input
            type="text"
            className="form-control"
            name="nivel"
            placeholder="Ingrese el nivel"
            value={materialData.nivel}
            onChange={(e) => handleChange(e, materialKey)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Vence</label>
          <input
            type="date"
            className="form-control"
            name="vence"
            value={materialData.vence}
            onChange={(e) => handleChange(e, materialKey)}
          />
        </div>
      </div>
    );
  };
  //funcion que renderiza los input para los materiales con 3 input
  const renderSimpleMaterialForm = (materialKey, materialLabel) => {
    const materialData = formData.materiales[materialKey] || {};

    return (
      <div className="mb-3">
        <h3 className="text-center mb-4">Material: {materialLabel}</h3>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <input
            type="text"
            className="form-control"
            name="tipo"
            placeholder="Ingrese el tipo"
            value={materialData.tipo}
            onChange={(e) => handleChange(e, materialKey)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Lote</label>
          <input
            type="text"
            className="form-control"
            name="lote"
            placeholder="Ingrese el lote"
            value={materialData.lote}
            onChange={(e) => handleChange(e, materialKey)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Vence</label>
          <input
            type="date"
            className="form-control"
            name="vence"
            value={materialData.vence}
            onChange={(e) => handleChange(e, materialKey)}
          />
        </div>
      </div>
    );
  };

  //manejador de los input del tipo de luz
  const handleLightChange = (e, key) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      luces: {
        ...prev.luces,
        [key]: {
          ...prev.luces[key],
          [name]: value,
        },
      },
    }));
  };
  //funcion que crea los input para las luces
  const renderLightInputForm = (key, label) => {
    const lightData = formData.luces[key] || {};

    return (
      <div className="mb-3">
        <h3 className="text-center mb-4">{label}</h3>
        <div className="mb-3">
          <label className="form-label">Medidor</label>
          <input
            type="text"
            className="form-control"
            name="medidor"
            placeholder="Ingrese el medidor"
            value={lightData.medidor || ""}
            onChange={(e) => handleLightChange(e, key)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Modelo</label>
          <input
            type="text"
            className="form-control"
            name="modelo"
            placeholder="Ingrese el modelo"
            value={lightData.modelo || ""}
            onChange={(e) => handleLightChange(e, key)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Serie</label>
          <input
            type="text"
            className="form-control"
            name="serie"
            placeholder="Ingrese la serie"
            value={lightData.serie || ""}
            onChange={(e) => handleLightChange(e, key)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Vencimiento</label>
          <input
            type="date"
            className="form-control"
            name="vencimiento"
            value={lightData.vencimiento || ""}
            onChange={(e) => handleLightChange(e, key)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Intensidad</label>
          <input
            type="text"
            className="form-control"
            name="intensidad"
            placeholder="Ingrese la intensidad"
            value={lightData.intensidad || ""}
            onChange={(e) => handleLightChange(e, key)}
          />
        </div>
      </div>
    );
  };

  //manejador para los datos de la zona de equipamiento 7 columnas
  const handleEquipamientoChange = (e, columnKey) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      equipamiento: {
        ...prev.equipamiento,
        [columnKey]: {
          ...prev.equipamiento[columnKey],
          [name]: value,
        },
      },
    }));
  };

  //funcion que crea los input para la zona de equipamiento
  const renderEquipamientoForm = (columnKey, columnLabel) => {
    const equipamientoData = formData.equipamiento[columnKey] || {};

    return (
      <div className="mb-3">
        <h3 className="text-center mb-4">{columnLabel}</h3>
        <div className="mb-3">
          <label className="form-label">Equipo</label>
          <input
            type="text"
            className="form-control"
            name="equipo"
            placeholder="Ingrese el equipo"
            value={equipamientoData.equipo || ""}
            onChange={(e) => handleEquipamientoChange(e, columnKey)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Modelo</label>
          <input
            type="text"
            className="form-control"
            name="modelo"
            placeholder="Ingrese el modelo"
            value={equipamientoData.modelo || ""}
            onChange={(e) => handleEquipamientoChange(e, columnKey)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Serie</label>
          <input
            type="text"
            className="form-control"
            name="serie"
            placeholder="Ingrese la serie"
            value={equipamientoData.serie || ""}
            onChange={(e) => handleEquipamientoChange(e, columnKey)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Vencimiento</label>
          <input
            type="date"
            className="form-control"
            name="vencimiento"
            value={equipamientoData.vencimiento || ""}
            onChange={(e) => handleEquipamientoChange(e, columnKey)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Frecuencia</label>
          <input
            type="text"
            className="form-control"
            name="frecuencia"
            placeholder="Ingrese la frecuencia"
            value={equipamientoData.frecuencia || ""}
            onChange={(e) => handleEquipamientoChange(e, columnKey)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ganancia</label>
          <input
            type="text"
            className="form-control"
            name="ganancia"
            placeholder="Ingrese la ganancia"
            value={equipamientoData.ganancia || ""}
            onChange={(e) => handleEquipamientoChange(e, columnKey)}
          />
        </div>
      </div>
    );
  };

  //funcion que renderiza el textarea de los resultados
  const renderTxtareasResultadoEnsayo = () => {
    return (
      <div className="mb-3">
        <div className="mb-3">
          <label className="form-label">Indica los resultados del ensayo</label>
          <textarea
            className="form-control"
            name="txtRdoEnsayo"
            rows="3"
            placeholder="Ingrese el resultado"
            value={formData.txtRdoEnsayo}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  };

  // cargar imagenes
  const [imagen1Cargada, setImagen1Cargada] = useState(false);
  const [imagen2Cargada, setImagen2Cargada] = useState(false);

  // Función para cargar una imagen y convertirla a base64
  const handleImageUpload = (e, imagenNumero) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          [imagenNumero === 1 ? "resultadosImagen1" : "resultadosImagen2"]:
            reader.result, // Guarda la imagen correspondiente
        }));

        if (imagenNumero === 1) {
          setImagen1Cargada(true);
        } else {
          setImagen2Cargada(true);
        }

        console.log(`Imagen ${imagenNumero} cargada:`, reader.result);
      };
      reader.onerror = (error) =>
        console.error(`Error al cargar la imagen ${imagenNumero}`, error);
    }
  };
  // Componente del Paso 23
  const Paso23 = () => (
    <div className="form-container shadow p-4 rounded">
      <p className="text-center">Carga tablas de información como imagenes</p>
      <div
        style={{
          border: "2px dashed #ccc",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <p className="text-center">Tabla 1</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 1)} // Llama a la función para cargar la imagen
        />
        {imagen1Cargada && (
          <div style={{ marginTop: "10px" }}>
            <p style={{ color: "green", fontSize: "14px" }}>
              ✔ Imagen 1 cargada
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          border: "2px dashed #ccc",
          padding: "10px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <p className="text-center">Tabla 2</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 2)} // Llama a la función para cargar la imagen
        />

        {imagen2Cargada && (
          <div style={{ marginTop: "10px" }}>
            <p style={{ color: "green", fontSize: "14px" }}>
              ✔ Imagen 2 cargada
            </p>
          </div>
        )}
      </div>
    </div>
  );
  const loadImageModule = () => {
    return new ImageModule({
      getImage: (tagValue) => {
        console.log("getImage - tagValue:", tagValue);
        
        // Manejar todos los casos no válidos
        if (!tagValue || tagValue === "" || tagValue === "--") {
          console.log("Imagen vacía o no definida, retornando null");
          return null;
        }
  
        // Verificar que sea un formato base64 válido
        if (
          !tagValue.startsWith("data:image/png;base64,") &&
          !tagValue.startsWith("data:image/jpeg;base64,")
        ) {
          console.warn("Formato de imagen no válido, se omitirá:", tagValue);
          return null;
        }
  
        // Extraer datos base64
        const base64Data = tagValue.split(",")[1];
        if (!base64Data) {
          console.warn("No se encontraron datos base64 válidos, se omitirá:", tagValue);
          return null;
        }
  
        // Intentar decodificar y convertir a Uint8Array
        try {
          const decodedData = atob(base64Data);
          const imageData = Uint8Array.from(decodedData, (c) => c.charCodeAt(0));
          console.log("Imagen procesada correctamente, longitud:", imageData.length);
          return imageData;
        } catch (error) {
          console.error("Error al decodificar la imagen:", error, "tagValue:", tagValue);
          return null;
        }
      },
      getSize: (img, tagValue, tagName) => {
        console.log("getSize - tagName:", tagName, "tagValue:", tagValue, "img:", img);
        
        // Si no hay imagen válida, devolver tamaño 0
        if (!img || !tagValue || tagValue === "" || tagValue === "--") {
          console.log("No hay imagen válida para dimensionar, retornando [0, 0]");
          return [0, 0];
        }
  
        // Dimensiones según el tipo de marcador
        if (tagName.includes("resultadosImagen")) {
          return [720, 100];
        } else if (tagName.includes("img")) {
          return [300, 300];
        }
  
        return [40, 40];
      },
    });
  };

// Modificar la función manejarCargaImagenTrabajo para que sea más genérica
const manejarCargaImagenTrabajo = (e, numeroImagen) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        [`imagendeltrabajo${numeroImagen}`]: reader.result,
      }));
      setImagenesTrabajoCargadas((prev) => ({
        ...prev,
        [`imagen${numeroImagen}`]: true,
      }));
    };
    reader.onerror = (error) =>
      console.error(
        `Error al cargar la imagen del trabajo ${numeroImagen}`,
        error
      );
  }
};
// Nueva función para agregar un nuevo input de imagen
const agregarInputImagen = () => {
  if (cantidadImagenes < 20) {
    setCantidadImagenes((prev) => prev + 1);
  }
};
// Modificar la función de renderizado de inputs
const renderizarInputsImagenTrabajo = () => {
  return Array.from({ length: cantidadImagenes }).map((_, index) => {
    const numeroImagen = index + 1;
    return (
      <div key={numeroImagen} style={{ marginBottom: "10px" }}>
        <label>Cargar imagen del trabajo {numeroImagen}</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => manejarCargaImagenTrabajo(e, numeroImagen)}
        />
        {imagenesTrabajoCargadas[`imagen${numeroImagen}`] && (
          <p style={{ color: "green", fontSize: "14px" }}>
            ✔ Imagen del trabajo {numeroImagen} cargada
          </p>
        )}
      </div>
    );
  });
};
const [imagenesTrabajoCargadas, setImagenesTrabajoCargadas] = useState(() => {
  const initialState = {};
  for (let i = 0; i <= 20; i++) {
    initialState[`imagen${i}`] = false;
  }
  return initialState;
});
// Agregar este estado al inicio del componente junto con los otros useState
const [cantidadImagenes, setCantidadImagenes] = useState(1); // Comienza con 1 input

  //convertir las imagenes de los sellos en base64
  const convertirImagenABase64 = (url, callback) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Evita problemas de CORS
    img.src = url;
  
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      
      const base64 = canvas.toDataURL("image/png"); // Convierte la imagen
      callback(base64);
    };
  
    img.onerror = (err) => {
      console.error("Error cargando la imagen:", err);
    };
  };
  


  const operadores = [
    {
      id: 1,
      nombre: "M. De Bernardo",
      nivel: "2",
      infoRara: "EV-LP-PM-CI-US.-",
      norma:"IRAM ISO 9712.-",
      firma: "/sellos/operadores/1.png",
    }
    
  ];

  const inspectores = [
    {
      id: 1,
      nombre: "D.Serrano",
      nivel: "2",
      cargo: "REPRESENTANTE TECNICO",
      norma: "IRAM ISO 9712.-",
      firma: "/sellos/inspectores/1.png",
    },
    {
      id: 2,
      nombre: "F.Campos",
      nivel: "2",
      infoRara: "LP-PM-CI-US.-",
      norma: "IRAM ISO 9712.-",
      firma: "/sellos/inspectores/2.png",
    },
    {
      id: 3,
      nombre: "P.Ducculi",
      nivel: "2",
      infoRara: "LP.-",
      norma: "IRAM ISO 9712.-",
      firma: "/sellos/inspectores/3.png",
    },
    
  ];


  const handleOperadorChange = (e) => {
    const selectedOperador = operadores.find((op) => op.nombre === e.target.value);
  
    if (selectedOperador) {
      convertirImagenABase64(selectedOperador.firma, (base64) => {
        setFormData((prev) => ({
          ...prev,
          operador: { ...selectedOperador, firma: base64 },
        }));
      });
    }
  };
  
  const handleInspectorChange = (e) => {
    const selectedInspector = inspectores.find((ins) => ins.nombre === e.target.value);
  
    if (selectedInspector) {
      convertirImagenABase64(selectedInspector.firma, (firmaBase64) => {
        setFormData((prev) => ({
          ...prev,
          inspector: { ...selectedInspector, firma: firmaBase64 },
        }));
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        inspector: { nombre: "", matricula: "", firma: "" },
      }));
    }
  };
  
  
  
  const renderOptions = (items) => {
    return (
      <>
        <option value="">Seleccionar...</option>
        {items?.map((item, index) => (
          <option key={index} value={item.nombre}>
            {item.nombre}
          </option>
        ))}
      </>
    );
  };
  
  const renderStep = () => {
    switch (step) {
      case 0:
  return (
    <div className="form-container shadow p-4 rounded">
      <h3 className="text-center mb-4">Elegir opción</h3>
      <button
                type="button"
                className="btn btn-success w-100"
                onClick={generarWord}
              >
                Generar Formulario de Ensayos (Vacío)
              </button>
              <button
                type="button"
                className="btn btn-success w-100 mt-2"
                onClick={generarWord2}
              >
                Generar Orden de trabajo (Vacío)
              </button>
      {/* Selector de Operador */}
      <div className="mb-3">
        <label className="form-label">Operador</label>
        <select
          className="form-control"
          name="operador"
          value={formData.operador?.nombre || ""}
          onChange={handleOperadorChange}
        >
          {renderOptions(operadores)}
        </select>
      </div>

      {/* Selector de Inspector */}
      <div className="mb-3">
        <label className="form-label">Inspector</label>
        <select
          className="form-control"
          name="inspector"
          value={formData.inspector?.nombre || ""}
          onChange={handleInspectorChange}
        >
          {renderOptions(inspectores)}
        </select>
      </div>

      <button
        type="button"
        className="btn btn-primary w-100"
        onClick={nextStep}
      >
        Completar Formulario
      </button>
            {uploadStatus === "subiendo" && (
  <div style={{ marginTop: '20px' }}>
    <p>Subiendo archivo...</p>
    <div style={{ width: "100%", background: "#ddd", borderRadius: 4 }}>
      <div
        style={{
          width: "100%",
          height: 8,
          background: "#4caf50",
          animation: "progress 2s infinite",
        }}
      />
    </div>
  </div>
)}

{uploadStatus === "exito" && (
  <p style={{ marginTop: '20px',color: "green" }}>✔ Archivo subido con éxito</p>
)}

{uploadStatus === "error" && (
  <p style={{ marginTop: '20px',color: "red" }}>❌ Ocurrió un error al subir el archivo</p>
)}

<style>
  {`@keyframes progress {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }`}
</style>
    </div>
    
  );


      case 1:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Formulario de Ensayos</h3>
            <h6 className="text-center mb-4">1</h6>
            <div className="mb-3">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                className="form-control"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Facilitado a</label>
              <input
                type="text"
                className="form-control"
                name="facilitadoA"
                placeholder="Nombre del cliente"
                value={formData.facilitadoA}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control mb-3"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleChange}
              />
              <label className="form-label">Localidad</label>
              <input
                type="text"
                className="form-control"
                name="localidad"
                placeholder="Localidad"
                value={formData.localidad}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Aeronave/Motor</label>
              <input
                type="text"
                className="form-control"
                name="aeronaveMotor"
                placeholder="Aeronave/Motor"
                value={formData.aeronaveMotor}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Matrícula/S.N</label>
              <input
                type="text"
                className="form-control"
                name="matricula"
                placeholder="Matrícula/S.N"
                value={formData.matricula}
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 2:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Formulario de Ensayos</h3>
            <h6 className="text-center mb-4">2</h6>
            <div className="mb-3">
              <label className="form-label">Motor - Componente</label>
              <input
                type="text"
                className="form-control"
                name="motorComponente"
                placeholder="Motor/Componente"
                value={formData.motorComponente}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Parte Número</label>
              <input
                type="text"
                className="form-control"
                name="parteNumero"
                placeholder="Parte Número"
                value={formData.parteNumero}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Serie Número</label>
              <input
                type="text"
                className="form-control"
                name="serieNumero"
                placeholder="Serie Número"
                value={formData.serieNumero}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">TSN/TSO</label>
              <input
                type="text"
                className="form-control"
                name="tsnTso"
                placeholder="TSN/TSO"
                value={formData.tsnTso}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Orden de Trabajo Nº</label>
              <input
                type="text"
                className="form-control"
                name="ordenDeTrabajo"
                placeholder="Orden de Trabajo Nº"
                value={formData.ordenDeTrabajo}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Informe Nº</label>
              <input
                type="text"
                className="form-control"
                name="informeNumero"
                placeholder="Informe Nº"
                value={formData.informeNumero}
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 3:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Tipos de Ensayo</h3>
            <h6 className="text-center mb-4">3</h6>
            {renderCheckboxes()}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );
      case 4:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Procedimientos</h3>
            <h6 className="text-center mb-4">4</h6>
            {renderTextareas()}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 5:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Material: Removedor</h3>
            <h6 className="text-center mb-4">5</h6>
            {renderMaterialForm("removedor", "Removedor")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 6:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Material: Penetrante</h3>
            <h6 className="text-center mb-4">6</h6>
            {renderMaterialForm("penetrante", "Penetrante")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 7:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Material: Partículas</h3>
            <h6 className="text-center mb-4">7</h6>
            {renderMaterialForm("particulas", "Partículas")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 8:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Material: Acoplante</h3>
            <h6 className="text-center mb-4">8</h6>
            {renderMaterialForm("acoplante", "Acoplante")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );
      case 9:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Material: Emulsificador</h3>
            <h6 className="text-center mb-4">9</h6>
            {renderSimpleMaterialForm("emulsificador", "Emulsificador")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );
      case 10:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Material: Revelador</h3>
            <h6 className="text-center mb-4">10</h6>
            {renderSimpleMaterialForm("revelador", "Revelador")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 11:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Material: Placas</h3>
            <h6 className="text-center mb-4">11</h6>
            {renderSimpleMaterialForm("placas", "Placas")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 12:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Material: Fijador</h3>
            <h6 className="text-center mb-4">12</h6>
            {renderSimpleMaterialForm("fijador", "Fijador")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 13:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Luz Ultravioleta</h3>
            <h6 className="text-center mb-4">13</h6>
            {renderLightInputForm("ultravioleta", "Luz Ultravioleta")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 14:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Luz Ambiental</h3>
            <h6 className="text-center mb-4">14</h6>
            {renderLightInputForm("ambiental", "Luz Ambiental")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 15:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Luz Blanca</h3>
            <h6 className="text-center mb-4">15</h6>
            {renderLightInputForm("blanca", "Luz Blanca")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 16:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Equipamiento - Columna 1/7</h3>
            <h6 className="text-center mb-4">16</h6>
            {renderEquipamientoForm("columna1", "Columna 1")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 17:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Equipamiento - Columna 2/7</h3>
            <h6 className="text-center mb-4">17</h6>
            {renderEquipamientoForm("columna2", "Columna 2")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 18:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Equipamiento - Columna 3/7</h3>
            <h6 className="text-center mb-4">18</h6>
            {renderEquipamientoForm("columna3", "Columna 3")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 19:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Equipamiento - Columna 4/7</h3>
            <h6 className="text-center mb-4">19</h6>
            {renderEquipamientoForm("columna4", "Columna 4")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 20:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Equipamiento - Columna 5/7</h3>
            <h6 className="text-center mb-4">20</h6>
            {renderEquipamientoForm("columna5", "Columna 5")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );
      case 21:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Equipamiento - Columna 6/7</h3>
            <h6 className="text-center mb-4">21</h6>
            {renderEquipamientoForm("columna6", "Columna 6")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );
      case 22:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Equipamiento - Columna 7/7</h3>
            <h6 className="text-center mb-4">22</h6>
            {renderEquipamientoForm("columna7", "Columna 7")}
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );

      case 23:
        return (
          <div className="form-container shadow p-4 rounded">
            <h3 className="text-center mb-4">Resultados del Ensayo</h3>
            <h6 className="text-center mb-4">23</h6>
            {renderTxtareasResultadoEnsayo()}
            <Paso23 />
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={prevStep}
            >
              Atrás
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={nextStep}
            >
              Continuar
            </button>
          </div>
        );
        case 24:
          return (
            <div className="form-container shadow p-4 rounded">
              <p className="text-center">
                Carga imágenes del trabajo (máximo 20)
              </p>
              {renderizarInputsImagenTrabajo()}
              
              {/* Botón para agregar más inputs */}
              <button
                type="button"
                className="btn btn-outline-primary w-100 mb-2"
                onClick={agregarInputImagen}
                disabled={cantidadImagenes >= 20}
              >
                + Agregar otra imagen
              </button>
        
              <button
                type="button"
                className="btn btn-secondary w-100 mb-2"
                onClick={prevStep}
              >
                Atrás
              </button>
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={generarWord}
              >
                Generar Formulario de Ensayos
              </button>
  <button
                type="button"
                className="btn btn-success w-100 mt-2"
                onClick={generarWord2}
              >
                Generar Orden de trabajo
              </button>
              {uploadStatus === "subiendo" && (
  <div style={{ marginTop: '20px' }}>
    <p>Subiendo archivo...</p>
    <div style={{ width: "100%", background: "#ddd", borderRadius: 4 }}>
      <div
        style={{
          width: "100%",
          height: 8,
          background: "#4caf50",
          animation: "progress 2s infinite",
        }}
      />
    </div>
  </div>
)}

{uploadStatus === "exito" && (
  <p style={{ marginTop: '20px',color: "green" }}>✔ Archivo subido con éxito</p>
)}

{uploadStatus === "error" && (
  <p style={{ marginTop: '20px',color: "red" }}>❌ Ocurrió un error al subir el archivo</p>
)}

<style>
  {`@keyframes progress {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }`}
</style>
            </div>
          );

      default:
        return null;
    }
  };
  return (
    <div className="container mt-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="form-container"
      >
        {renderStep()}
      </form>
    </div>
  );
};

export default Formulario;
