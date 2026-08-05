package com.ngo.platform.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.ngo.platform.exception.ResourceNotFoundException;
import com.ngo.platform.model.Application;
import com.ngo.platform.model.ApplicationStatus;
import com.ngo.platform.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class CertificateService {

    private final ApplicationRepository applicationRepository;

    public CertificateService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public byte[] generateCertificate(Long applicationId) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application not found"));

        if (application.getStatus() != ApplicationStatus.COMPLETED) {
            throw new IllegalStateException(
                    "Certificate is available only after event completion."
            );
        }

        if (!application.isAttended()) {
            throw new IllegalStateException(
                    "Attendance has not been marked."
            );
        }

        try {

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            Document document = new Document(PageSize.A4);

            PdfWriter.getInstance(document, out);

            document.open();

            Font title =
                    new Font(Font.FontFamily.HELVETICA, 24, Font.BOLD);

            Font normal =
                    new Font(Font.FontFamily.HELVETICA, 16);

            Paragraph heading =
                    new Paragraph(
                            "CERTIFICATE OF APPRECIATION",
                            title
                    );

            heading.setAlignment(Element.ALIGN_CENTER);

            document.add(heading);

            document.add(new Paragraph("\n\n"));

            Paragraph body =
                    new Paragraph(

                            "This certificate is proudly presented to\n\n"

                                    + application.getUser().getName()

                                    + "\n\nfor successfully volunteering in\n\n"

                                    + application.getEvent().getTitle()

                                    + "\n\nThank you for your valuable contribution to our community.",

                            normal

                    );

            body.setAlignment(Element.ALIGN_CENTER);

            document.add(body);

            document.close();

            return out.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(e);

        }

    }

}