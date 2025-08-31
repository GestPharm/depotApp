package sn.psi.depotHopital.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;
import sn.psi.depotHopital.entities.Transaction;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class PdfService {

    public byte[] generateCommandesPdf(List<Transaction> commandes) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        Document document = new Document();
        PdfWriter.getInstance(document, baos);
        document.open();

        // Titre
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
        Paragraph title = new Paragraph("Dernières commandes", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);
        document.add(Chunk.NEWLINE);

        // Tableau
        PdfPTable table = new PdfPTable(4); // 3 colonnes
        table.setWidthPercentage(100);
        table.setWidths(new float[]{1, 4, 2, 2}); // largeur relative des colonnes

        // En-têtes
        table.addCell("No");
        table.addCell("Produits");
        table.addCell("Prix Total");
        table.addCell("Date");

        // Remplissage
        for (Transaction cmd : commandes) {
            table.addCell(String.valueOf(cmd.getId()));

            StringBuilder produits = new StringBuilder();
            cmd.getLigneProduits().forEach(lp -> {
                produits.append(lp.getProduit().getDci())
                        .append(" ")
                        .append(lp.getProduit().getDosage())
                        .append(" - ")
                        .append(lp.getQuantite())
                        .append("\n");
            });
            table.addCell(produits.toString());

            table.addCell(cmd.getPrixTotal()!=null? cmd.getPrixTotal().toString():"");

            table.addCell(cmd.getDateTransaction().toString());
        }

        document.add(table);
        document.close();

        return baos.toByteArray();
    }
}

