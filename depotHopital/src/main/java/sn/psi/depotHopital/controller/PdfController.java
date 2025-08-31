package sn.psi.depotHopital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.psi.depotHopital.entities.Transaction;
import sn.psi.depotHopital.services.PdfService;
import sn.psi.depotHopital.services.TransactionService;

import java.util.List;

@RestController
@RequestMapping("/api/pdf")
public class PdfController {

    @Autowired
    private PdfService pdfService;
    @Autowired
    private  TransactionService transactionService;



    @GetMapping(value = "/stat_by_poste_pdf/{idPoste}" , produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> exportCommandesPdf(@PathVariable Long idPoste) throws Exception {
        List<Transaction> commandes = transactionService.getTransactionsForPoste(idPoste); // ou findTop10ByOrderByDateDesc()
        byte[] pdf = pdfService.generateCommandesPdf(commandes);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=commandes.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}

