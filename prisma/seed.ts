import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding E-Commerce Growth Intelligence Database...');

  // Clean existing data
  await prisma.growthHypothesis.deleteMany();
  await prisma.intelligenceInsight.deleteMany();
  await prisma.returnLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();

  // 1. Slim Fit Oxford Shirt
  const shirt = await prisma.product.create({
    data: {
      name: 'Signature Slim Fit Oxford Shirt',
      sku: 'APP-OXF-001',
      category: 'Apparel',
      price: 68.0,
      cost: 22.0,
      monthlySales: 1450,
      returnRate: 23.4,
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
      description: '100% organic cotton long-sleeve button-down shirt designed with modern slim taper.',
      reviews: {
        create: [
          {
            rating: 2,
            title: 'Way too tight across shoulders and chest',
            comment: 'Quality fabric feels great, but the sizing is completely off! I normally wear a Medium in all brands, but I could barely button this up. Arms are too narrow.',
            channel: 'Shopify',
            aspect: 'fit',
            sentiment: 'negative',
            sentimentScore: -0.75,
            verifiedPurchase: true,
            customerName: 'Marcus V.',
          },
          {
            rating: 1,
            title: 'Sizing chart is misleading',
            comment: 'The chest measurement on the size guide says 40 inches for Large, but it measures barely 38. Had to return and lost shipping money.',
            channel: 'Amazon',
            aspect: 'fit',
            sentiment: 'negative',
            sentimentScore: -0.85,
            verifiedPurchase: true,
            customerName: 'Daniel K.',
          },
          {
            rating: 3,
            title: 'Size up by one or two sizes',
            comment: 'Nice shirt for the price, but be warned: size up! Collar is also a bit stiff.',
            channel: 'Trendyol',
            aspect: 'fit',
            sentiment: 'neutral',
            sentimentScore: -0.1,
            verifiedPurchase: true,
            customerName: 'Emre T.',
          },
          {
            rating: 5,
            title: 'Perfect if you are athletic and size up',
            comment: 'I followed the reviews and ordered an XL instead of L. Fits like a glove. Beautiful stitching.',
            channel: 'Shopify',
            aspect: 'quality',
            sentiment: 'positive',
            sentimentScore: 0.9,
            verifiedPurchase: true,
            customerName: 'Alex R.',
          },
          {
            rating: 2,
            title: 'Shrank noticeably after first cold wash',
            comment: 'Washed at 30C and hung dry, but sleeves shrank nearly an inch. Now unwearable.',
            channel: 'Amazon',
            aspect: 'quality',
            sentiment: 'negative',
            sentimentScore: -0.65,
            verifiedPurchase: true,
            customerName: 'Liam N.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Too small / tight across chest', orderValue: 68.0, returnCost: 14.50, customerNote: 'Chest and bicep area cut way too narrow.' },
          { reason: 'Size chart mismatch', orderValue: 68.0, returnCost: 14.50, customerNote: 'Followed guide, got Medium, fits like XS.' },
          { reason: 'Too small / tight across chest', orderValue: 136.0, returnCost: 18.00, customerNote: 'Ordered 2 shirts, both uncomfortably tight.' },
          { reason: 'Fabric shrinkage after wash', orderValue: 68.0, returnCost: 14.50, customerNote: 'Shrank after first delicate cycle.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'Severe Chest & Bicep Taper Miscalibration',
            severity: 'CRITICAL',
            affectedAspect: 'fit',
            summary: '76% of negative reviews and 81% of returns cite extreme tightness across chest and biceps.',
            rootCause: 'European slim cut pattern was applied without adjusting grading for North American & global standard sizing.',
            estimatedMonthlyLoss: 11450.0,
            evidenceQuote: 'Normally wear Medium, but could barely button this up. Size guide is misleading.',
            status: 'OPEN',
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'Interactive 3D Fit Assistant & "Runs Small" Banner',
            problemStatement: 'Customers purchase their standard size based on static charts, resulting in 23.4% return rate and $11.4k monthly margin loss.',
            hypothesis: 'Adding a prominent warning banner ("Runs 1 size small - 82% of buyers recommend sizing up") and dynamic Fit recommender on PDP will drop return rate by 35% with zero drop in conversion.',
            expectedMetricImpact: '-8.2% Return Rate, -$7,200 Monthly Waste',
            status: 'TESTING',
            testType: 'PDP UX & Copy',
            gherkinSpec: 'Feature: Dynamic Size Warning\n  Scenario: Customer selects standard size\n    Given the user is on the Shirt PDP\n    When they view the size selector\n    Then a high-contrast badge displays "Runs 1 Size Small: Recommend Sizing Up"\n    And the interactive fit modal accurately suggests the optimal size.',
          },
        ],
      },
    },
  });

  // 2. Wireless Noise-Cancelling Earbuds
  const earbuds = await prisma.product.create({
    data: {
      name: 'AeroSound Pro ANC Wireless Earbuds',
      sku: 'ELE-AUD-042',
      category: 'Electronics',
      price: 129.0,
      cost: 44.0,
      monthlySales: 890,
      returnRate: 14.2,
      imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
      description: 'Active noise cancelling wireless earbuds with 32-hour battery life and spatial audio.',
      reviews: {
        create: [
          {
            rating: 1,
            title: 'Left earbud battery dies in 40 minutes',
            comment: 'Right earbud lasts 6 hours, but left earbud consistently drops from 100% to dead within 45 minutes. Unacceptable for a $129 pair.',
            channel: 'Amazon',
            aspect: 'quality',
            sentiment: 'negative',
            sentimentScore: -0.92,
            verifiedPurchase: true,
            customerName: 'Sarah M.',
          },
          {
            rating: 2,
            title: 'Bluetooth drops repeatedly during phone calls',
            comment: 'Music sounds okay, but mic and connection drop out whenever my phone is in my jeans pocket.',
            channel: 'Shopify',
            aspect: 'usability',
            sentiment: 'negative',
            sentimentScore: -0.68,
            verifiedPurchase: true,
            customerName: 'Kevin J.',
          },
          {
            rating: 5,
            title: 'Amazing ANC for travel',
            comment: 'Took this on a 12 hour flight, canceled out engine roar completely. Case charges very fast.',
            channel: 'Shopify',
            aspect: 'quality',
            sentiment: 'positive',
            sentimentScore: 0.95,
            verifiedPurchase: true,
            customerName: 'Zeynep B.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Left earbud battery drain', orderValue: 129.0, returnCost: 16.0, customerNote: 'Left bud dies after 30 mins every time.' },
          { reason: 'Bluetooth connection drops', orderValue: 129.0, returnCost: 16.0, customerNote: 'Keeps disconnecting on calls.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'Asymmetric Battery Firmware Drain (Left Unit)',
            severity: 'HIGH',
            affectedAspect: 'quality',
            summary: 'Left master earbud consumes 3.5x power due to master-slave BLE ping frequency issue in Firmware v1.2.',
            rootCause: 'Firmware bug in Bluetooth Low Energy handoff causing continuous polling on left audio channel.',
            estimatedMonthlyLoss: 8900.0,
            evidenceQuote: 'Right earbud lasts 6 hours, left earbud dies in 45 minutes.',
            status: 'OPEN',
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'OTA Firmware v1.3 Update Notification in Companion App & Packaging Slip',
            problemStatement: 'Customers assume hardware battery failure and initiate RMA returns before checking for firmware updates.',
            hypothesis: 'Including an unboxing insert highlighting the instant companion app firmware update will deflect 40% of battery-related returns.',
            expectedMetricImpact: '-5.7% Overall Returns, +12% Net NPS',
            status: 'DRAFT',
            testType: 'Packaging & Onboarding',
            gherkinSpec: 'Feature: Firmware Onboarding\n  Scenario: Customer unboxes earbuds\n    Given the customer opens package\n    When they scan QR code for QuickStart\n    Then they are prompted to update firmware before first use.',
          },
        ],
      },
    },
  });

  // 3. Organic Retinol Night Serum
  const serum = await prisma.product.create({
    data: {
      name: 'Lumina Botanical Retinol Night Serum',
      sku: 'BEA-SER-019',
      category: 'Beauty',
      price: 54.0,
      cost: 11.0,
      monthlySales: 2100,
      returnRate: 6.8,
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
      description: 'Gentle 0.5% encapsulated plant-based retinol serum for radiant skin and fine lines.',
      reviews: {
        create: [
          {
            rating: 5,
            title: 'Zero irritation, glowing skin in 2 weeks',
            comment: 'My sensitive skin usually hates retinol, but this gentle formula is holy grail! No peeling at all.',
            channel: 'Shopify',
            aspect: 'quality',
            sentiment: 'positive',
            sentimentScore: 0.98,
            verifiedPurchase: true,
            customerName: 'Chloe D.',
          },
          {
            rating: 1,
            title: 'Glass dropper arrived shattered and leaked',
            comment: 'Serum was spilled all over the padded envelope. Glass dropper was broken in pieces. Dangerous packaging!',
            channel: 'Amazon',
            aspect: 'shipping',
            sentiment: 'negative',
            sentimentScore: -0.9,
            verifiedPurchase: true,
            customerName: 'Jessica P.',
          },
          {
            rating: 2,
            title: 'Dropper leaks from the collar',
            comment: 'Great formula inside, but the dropper collar does not seal properly. Product oxidizes and leaks during travel.',
            channel: 'Trendyol',
            aspect: 'shipping',
            sentiment: 'negative',
            sentimentScore: -0.6,
            verifiedPurchase: true,
            customerName: 'Burcu Y.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Damaged / leaked during shipping', orderValue: 54.0, returnCost: 12.0, customerNote: 'Dropper shattered in box.' },
          { reason: 'Dropper collar leak', orderValue: 54.0, returnCost: 12.0, customerNote: 'Lost half the bottle during shipping.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'Fragile Pipette Glass & Non-Sealing Dropper Cap',
            severity: 'MEDIUM',
            affectedAspect: 'shipping',
            summary: '68% of negative reviews are caused by packaging failure rather than product formula efficacy.',
            rootCause: 'Outer shipper box lacks internal molded insert; dropper bulb twists loose under transit vibration.',
            estimatedMonthlyLoss: 4200.0,
            evidenceQuote: 'Glass dropper arrived shattered and leaked all over envelope.',
            status: 'OPEN',
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'Switch to Airless Pump Dispenser & Protective Cardboard Sleeve',
            problemStatement: 'Liquid leakage and broken glass cause 6.8% return rate and safety complaints.',
            hypothesis: 'Replacing the glass dropper with an airless pump bottle will eliminate shipping leakage by 95% and preserve retinol potency.',
            expectedMetricImpact: '-4.5% Return Rate, +8% Repeat Purchase Rate',
            status: 'VALIDATED',
            testType: 'Packaging Redesign',
            gherkinSpec: 'Feature: Packaging Durability\n  Scenario: Shipping shock test\n    Given product in airless pump\n    When subjected to 1.5m drop test\n    Then zero liquid leakage occurs.',
          },
        ],
      },
    },
  });

  console.log('Seeded 3 core products with rich reviews, returns, insights and hypotheses!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
